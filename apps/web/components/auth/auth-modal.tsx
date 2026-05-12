'use client';

import { Mail, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Halo } from '@/components/blocks/halo';

import { useAuthModal } from './auth-modal-provider';

/**
 * Modal d'authentification — déclenchée par tous les CTA "Je suis intéressé(e)".
 *
 * Pour l'instant, AUCUN provider d'auth n'est branché — chaque bouton se
 * contente de rediriger vers `/candidature` (le tunnel de préinscription).
 * À brancher plus tard : Supabase OAuth (Google/Apple) ou magic link email.
 */
export function AuthModal() {
  const { isOpen, close } = useAuthModal();
  const router = useRouter();

  if (!isOpen) return null;

  const startOnboarding = () => {
    close();
    router.push('/candidature');
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
          <div className="text-center">
            <p className="font-serif text-[1.5rem] leading-none text-terra-light">
              AlterAges
            </p>
            <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-white/40">
              Espace étudiant
            </p>
          </div>

          <h2
            id="auth-modal-title"
            className="mt-7 text-center font-serif text-[1.4rem] italic leading-tight text-white"
          >
            Rejoignez le vivier
          </h2>
          <p className="mt-2 text-center text-[0.85rem] leading-[1.7] text-white/55">
            Créez votre espace en quelques secondes. Votre dossier se complète à
            votre rythme.
          </p>

          <div className="mt-7 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={startOnboarding}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 text-[0.85rem] text-white transition-colors hover:border-white/30 hover:bg-white/[0.12]"
            >
              <GoogleIcon />
              Continuer avec Google
            </button>
            <button
              type="button"
              onClick={startOnboarding}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 text-[0.85rem] text-white transition-colors hover:border-white/30 hover:bg-white/[0.12]"
            >
              <AppleIcon />
              Continuer avec Apple
            </button>
          </div>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[0.72rem] text-white/30">ou</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={startOnboarding}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-terra px-4 py-3 text-[0.85rem] font-medium text-white transition-colors hover:bg-terra-dark"
          >
            <Mail className="h-4 w-4" />
            Continuer avec mon e-mail
          </button>

          <p className="mt-6 text-center text-[0.74rem] text-white/35">
            Déjà inscrit ?{' '}
            <button
              type="button"
              onClick={startOnboarding}
              className="text-white/55 underline-offset-2 transition-colors hover:text-terra-light hover:underline"
            >
              Me connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                              ICONS                                  */
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

function AppleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.43c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.56-1.31 3.1-2.54 3.96zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
