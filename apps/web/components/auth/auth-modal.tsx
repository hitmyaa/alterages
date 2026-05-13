'use client';

import { CheckCircle2, Lock, Mail, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Halo } from '@/components/blocks/halo';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

import { useAuthModal } from './auth-modal-provider';

type Mode = 'sign-in' | 'sign-up' | 'reset';

/* Traduction française des erreurs Supabase les plus courantes. */
function translateError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials'))
    return 'E-mail ou mot de passe incorrect.';
  if (m.includes('user already registered'))
    return 'Un compte existe déjà avec cet e-mail. Essayez de vous connecter.';
  if (m.includes('password should be at least'))
    return 'Le mot de passe doit contenir au moins 6 caractères.';
  if (m.includes('email not confirmed'))
    return 'E-mail non vérifié. Cliquez sur le lien envoyé dans votre boîte mail.';
  if (m.includes('email rate limit'))
    return 'Trop de tentatives. Réessayez dans quelques minutes.';
  return message;
}

/**
 * Modal d'authentification — email + mot de passe traditionnel + Google OAuth.
 *
 * 3 modes :
 * - sign-in : connexion classique
 * - sign-up : création de compte
 * - reset   : demande d'envoi d'un lien de réinitialisation
 *
 * En cas de succès :
 * - sign-in/sign-up avec session : redirige vers /espace ou /candidature
 *   selon `user_metadata.onboarded`
 * - reset : affiche l'écran de confirmation "lien envoyé"
 */
export function AuthModal() {
  const { isOpen, close } = useAuthModal();
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  const [mode, setMode] = React.useState<Mode>('sign-in');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState<'google' | 'email' | null>(null);
  const [sentTo, setSentTo] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  /* Reset l'état à chaque fermeture. */
  React.useEffect(() => {
    if (!isOpen) {
      setMode('sign-in');
      setEmail('');
      setPassword('');
      setLoading(null);
      setSentTo(null);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const origin =
    typeof window !== 'undefined' ? window.location.origin : '';

  /* Redirige selon le flag onboarded de l'utilisateur. */
  const routeAfterAuth = (onboarded: boolean) => {
    close();
    router.push(onboarded ? '/espace' : '/candidature');
    router.refresh();
  };

  /* --- GOOGLE OAUTH --- */
  const handleGoogle = async () => {
    setError(null);
    setLoading('google');
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${origin}/auth/callback` },
    });
    if (err) {
      setError(translateError(err.message));
      setLoading(null);
    }
    /* Sinon redirection automatique vers Google. */
  };

  /* --- SUBMIT (sign-in / sign-up / reset) --- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading('email');

    if (mode === 'sign-in') {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) {
        setError(translateError(err.message));
        setLoading(null);
        return;
      }
      const onboarded = data.user?.user_metadata?.onboarded === true;
      routeAfterAuth(onboarded);
      return;
    }

    if (mode === 'sign-up') {
      const { data, error: err } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${origin}/auth/callback` },
      });
      if (err) {
        setError(translateError(err.message));
        setLoading(null);
        return;
      }
      /* Si "Confirm email" est désactivé côté Supabase, on a déjà une session.
       * Sinon, on affiche l'écran "vérifiez votre email". */
      if (data.session) {
        routeAfterAuth(false);
      } else {
        setSentTo(email.trim());
        setLoading(null);
      }
      return;
    }

    /* mode === 'reset' */
    const { error: err } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${origin}/auth/reset-password` },
    );
    if (err) {
      setError(translateError(err.message));
      setLoading(null);
      return;
    }
    setSentTo(email.trim());
    setLoading(null);
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-deep/75 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-deep p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Halo color="terra" position="bottom-right" size="md" />
        <Halo color="sage" position="top-left" size="md" />

        <button
          type="button"
          aria-label="Fermer"
          onClick={close}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-colors hover:border-white/25 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-10">
          <h2 id="auth-modal-title" className="sr-only">
            Authentification AlterAges
          </h2>

          <div className="text-center">
            <p className="font-serif text-[1.5rem] leading-none text-terra-light">
              AlterAges
            </p>
            <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-white/40">
              Espace étudiant
            </p>
          </div>

          {/* ----------------- ÉCRAN succès reset ----------------- */}
          {sentTo && mode === 'reset' ? (
            <ResetSent email={sentTo} onBack={() => {
              setSentTo(null);
              setMode('sign-in');
            }} />
          ) : sentTo && mode === 'sign-up' ? (
            <SignUpSent email={sentTo} onBack={() => {
              setSentTo(null);
              setMode('sign-in');
            }} />
          ) : (
            <>
              {/* ------- GOOGLE OAUTH ------- */}
              {mode !== 'reset' ? (
                <>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handleGoogle}
                      disabled={loading !== null}
                      className={cn(
                        'flex w-full items-center justify-center gap-3 rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 text-[0.85rem] text-white transition-colors hover:border-white/30 hover:bg-white/[0.12]',
                        loading !== null && 'cursor-wait opacity-60',
                      )}
                    >
                      <GoogleIcon />
                      {loading === 'google'
                        ? 'Redirection…'
                        : 'Continuer avec Google'}
                    </button>
                  </div>

                  <div className="my-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-[0.72rem] text-white/30">ou</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                </>
              ) : (
                <div className="mt-8" />
              )}

              {/* ------- FORMULAIRE ------- */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <label className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
                    aria-hidden
                  />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    disabled={loading !== null}
                    className="w-full rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 pl-10 text-[0.88rem] text-white placeholder:text-white/30 transition-colors focus:border-terra-light focus:outline-none focus:ring-1 focus:ring-terra-light/30 disabled:opacity-60"
                  />
                </label>

                {mode !== 'reset' ? (
                  <label className="relative">
                    <Lock
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
                      aria-hidden
                    />
                    <input
                      type="password"
                      required
                      minLength={6}
                      autoComplete={
                        mode === 'sign-up' ? 'new-password' : 'current-password'
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        mode === 'sign-up'
                          ? 'Mot de passe (min. 6 caractères)'
                          : 'Mot de passe'
                      }
                      disabled={loading !== null}
                      className="w-full rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 pl-10 text-[0.88rem] text-white placeholder:text-white/30 transition-colors focus:border-terra-light focus:outline-none focus:ring-1 focus:ring-terra-light/30 disabled:opacity-60"
                    />
                  </label>
                ) : null}

                {mode === 'sign-in' ? (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('reset');
                        setError(null);
                      }}
                      className="text-[0.74rem] text-white/45 underline-offset-2 transition-colors hover:text-terra-light hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={
                    loading !== null ||
                    !email.trim() ||
                    (mode !== 'reset' && password.length < 6)
                  }
                  className={cn(
                    'mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-terra px-4 py-3 text-[0.85rem] font-medium text-white transition-colors hover:bg-terra-dark',
                    (loading !== null ||
                      !email.trim() ||
                      (mode !== 'reset' && password.length < 6)) &&
                      'cursor-not-allowed opacity-60 hover:bg-terra',
                  )}
                >
                  {loading === 'email'
                    ? mode === 'reset'
                      ? 'Envoi…'
                      : 'Connexion…'
                    : mode === 'sign-in'
                      ? 'Se connecter'
                      : mode === 'sign-up'
                        ? 'Créer mon compte'
                        : 'Envoyer le lien'}
                </button>
              </form>

              {error ? (
                <p
                  role="alert"
                  className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-center text-[0.78rem] text-white"
                >
                  {error}
                </p>
              ) : null}

              {/* ------- TOGGLE MODE ------- */}
              <p className="mt-6 text-center text-[0.78rem] text-white/45">
                {mode === 'sign-in' ? (
                  <>
                    Pas encore de compte ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('sign-up');
                        setError(null);
                      }}
                      className="font-medium text-white/70 underline-offset-2 transition-colors hover:text-terra-light hover:underline"
                    >
                      Créer un compte
                    </button>
                  </>
                ) : mode === 'sign-up' ? (
                  <>
                    Déjà inscrit ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('sign-in');
                        setError(null);
                      }}
                      className="font-medium text-white/70 underline-offset-2 transition-colors hover:text-terra-light hover:underline"
                    >
                      Se connecter
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('sign-in');
                      setError(null);
                    }}
                    className="font-medium text-white/70 underline-offset-2 transition-colors hover:text-terra-light hover:underline"
                  >
                    ← Revenir à la connexion
                  </button>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                        SUB COMPONENTS                               */
/* ------------------------------------------------------------------ */

function ResetSent({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <div className="mt-8 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20 text-sage-light">
        <CheckCircle2 className="h-6 w-6" aria-hidden />
      </div>
      <p className="font-serif text-[1.15rem] italic text-white">
        Lien envoyé !
      </p>
      <p className="mx-auto mt-3 max-w-xs text-[0.85rem] leading-[1.7] text-white/55">
        Un lien de réinitialisation a été envoyé à{' '}
        <strong className="text-white">{email}</strong>. Cliquez dessus pour
        définir un nouveau mot de passe.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 text-[0.78rem] text-white/55 underline-offset-2 transition-colors hover:text-terra-light hover:underline"
      >
        ← Revenir à la connexion
      </button>
    </div>
  );
}

function SignUpSent({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <div className="mt-8 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20 text-sage-light">
        <CheckCircle2 className="h-6 w-6" aria-hidden />
      </div>
      <p className="font-serif text-[1.15rem] italic text-white">
        Confirmez votre e-mail
      </p>
      <p className="mx-auto mt-3 max-w-xs text-[0.85rem] leading-[1.7] text-white/55">
        Un lien de confirmation a été envoyé à{' '}
        <strong className="text-white">{email}</strong>. Cliquez dessus pour
        activer votre compte.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 text-[0.78rem] text-white/55 underline-offset-2 transition-colors hover:text-terra-light hover:underline"
      >
        ← Revenir à la connexion
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                              ICON                                   */
/* ------------------------------------------------------------------ */

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
