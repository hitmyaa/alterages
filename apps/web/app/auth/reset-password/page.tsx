'use client';

import { CheckCircle2, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

/**
 * Page de réinitialisation de mot de passe.
 *
 * L'utilisateur arrive ici via le lien envoyé par e-mail
 * (`resetPasswordForEmail`). À ce moment, Supabase a déjà ouvert une
 * session temporaire de type "recovery" qui autorise UNIQUEMENT
 * `updateUser({ password })`.
 *
 * Si l'utilisateur arrive sans token valide, il est renvoyé vers la home.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setError(null);
    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setDone(true);
    /* Petit délai pour laisser le succès visible, puis redirect. */
    setTimeout(() => {
      router.push('/espace');
      router.refresh();
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md rounded-2xl border border-bd bg-white p-8 shadow-soft md:p-10">
        <header className="mb-6 text-center">
          <p className="font-serif text-[1.5rem] leading-none text-terra">
            AlterAges
          </p>
          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-light">
            Réinitialiser le mot de passe
          </p>
        </header>

        {done ? (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 text-sage">
              <CheckCircle2 className="h-6 w-6" aria-hidden />
            </div>
            <p className="font-serif text-[1.15rem] italic text-deep">
              Mot de passe mis à jour
            </p>
            <p className="mx-auto mt-2 max-w-xs text-[0.85rem] leading-[1.7] text-mid">
              Redirection vers votre espace…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="mb-2 text-[0.85rem] leading-[1.6] text-mid">
              Choisissez un nouveau mot de passe pour votre compte.
            </p>

            <label className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-light"
                aria-hidden
              />
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nouveau mot de passe (min. 6)"
                disabled={loading}
                className="field-input pl-10"
              />
            </label>

            <label className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-light"
                aria-hidden
              />
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirmer le mot de passe"
                disabled={loading}
                className="field-input pl-10"
              />
            </label>

            {error ? (
              <p
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-[0.78rem] text-destructive"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading || password.length < 6 || password !== confirm}
              className={cn(
                'mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-terra px-4 py-3 text-[0.85rem] font-medium text-white transition-colors hover:bg-terra-dark',
                (loading || password.length < 6 || password !== confirm) &&
                  'cursor-not-allowed opacity-60 hover:bg-terra',
              )}
            >
              {loading ? 'Mise à jour…' : 'Mettre à jour mon mot de passe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
