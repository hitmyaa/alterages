import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Layout dédié au tunnel de candidature — volontairement hors du groupe
 * (public) pour ne pas hériter du header marketing et du footer. Pattern
 * type "checkout fullscreen" (Stripe, Linear) : l'utilisateur est focus
 * sur le parcours, distractions minimales.
 *
 * Header minimal : un seul élément, le bouton de retour vers `/etudiants`.
 * Le logo est volontairement absent — moins d'options = moins de fuite.
 */
export default function CandidatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-warm flex min-h-screen flex-col">
      <header className="border-bd-light/80 bg-cream/90 sticky top-0 z-30 border-b backdrop-blur-md">
        <div className="container flex h-[68px] items-center">
          <Link
            href="/etudiants"
            className="text-mid hover:text-terra group inline-flex items-center gap-2 text-[0.85rem] font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Retour à la page étudiants
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
