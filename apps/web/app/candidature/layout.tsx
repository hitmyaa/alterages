import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Layout dédié au tunnel de candidature — volontairement hors du groupe
 * (public) pour ne pas hériter du header marketing et du footer. Pattern
 * type "checkout fullscreen" (Stripe, Linear) : l'utilisateur est focus
 * sur le parcours, distractions minimales.
 */
export default function CandidatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-warm">
      <header className="sticky top-0 z-30 border-b border-bd-light/80 bg-cream/90 backdrop-blur-md">
        <div className="container flex h-[68px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/transparent-logo-terra.svg"
              alt="Logo AlterAges"
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
            <span className="font-serif text-[1.45rem] leading-none tracking-tight text-deep">
              Alter<em className="font-normal italic text-terra">Ages</em>
            </span>
          </Link>

          <Link
            href="/etudiants"
            className="inline-flex items-center gap-2 text-[0.78rem] text-mid transition-colors hover:text-terra"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Retour à la page étudiants</span>
            <span className="sm:hidden">Retour</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
