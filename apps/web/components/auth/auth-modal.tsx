'use client';

import { Clock, Mail, X } from 'lucide-react';
import * as React from 'react';

import { Halo } from '@/components/blocks/halo';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

import { useAuthModal } from './auth-modal-provider';

/**
 * Modal d'authentification — Google OAuth uniquement pour l'instant.
 *
 * L'auth par email + mot de passe (et le flow de reset associé) est
 * temporairement désactivé en attendant la configuration SMTP custom
 * Supabase (Resend) en prod. Le bouton reste visible avec un badge
 * "Bientôt" pour préserver l'intention UX.
 */
export function AuthModal() {
  const { isOpen, close } = useAuthModal();
  const supabase = React.useMemo(() => createClient(), []);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  /* Reset l'état à chaque fermeture. */
  React.useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${origin}/auth/callback` },
    });
    if (err) {
      setError(err.message);
      setLoading(false);
    }
    /* Sinon redirection automatique vers Google. */
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="auth-modal-title"
      className="bg-deep/75 fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="bg-deep relative w-full max-w-md overflow-hidden rounded-xl border border-white/10 p-8 sm:p-10"
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
            <p className="text-terra-light font-serif text-[1.5rem] leading-none">AlterAges</p>
            <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-white/40">
              Espace étudiant
            </p>
          </div>

          {/* GOOGLE OAUTH */}
          <div className="mt-8 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className={cn(
                'flex w-full items-center justify-center gap-3 rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 text-[0.85rem] text-white transition-colors hover:border-white/30 hover:bg-white/[0.12]',
                loading && 'cursor-wait opacity-60',
              )}
            >
              <GoogleIcon />
              {loading ? 'Redirection…' : 'Continuer avec Google'}
            </button>

            {/* EMAIL — désactivé, bientôt disponible */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Connexion par e-mail bientôt disponible"
              className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 text-[0.85rem] text-white/40"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Continuer avec mon e-mail
              <span className="bg-terra/20 text-terra-light ml-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.66rem] font-medium uppercase tracking-wider">
                <Clock className="h-2.5 w-2.5" aria-hidden />
                Bientôt
              </span>
            </button>
          </div>

          {error ? (
            <p
              role="alert"
              className="border-destructive/30 bg-destructive/10 mt-4 rounded-md border px-3 py-2 text-center text-[0.78rem] text-white"
            >
              {error}
            </p>
          ) : null}

          <p className="mt-6 text-center text-[0.74rem] text-white/45">
            En continuant, vous acceptez nos{' '}
            <a
              href="/mentions-legales"
              className="hover:text-terra-light text-white/70 underline-offset-2 transition-colors hover:underline"
            >
              conditions
            </a>
            .
          </p>
        </div>
      </div>
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
