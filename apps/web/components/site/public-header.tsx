'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { InterestButton } from '@/components/auth/interest-button';

type NavItem = { href: string; label: string };

/* Liens par défaut — landing + pages neutres (a-propos, tarifs, etc.). */
const landingNav: ReadonlyArray<NavItem> = [
  { href: '/#aidants', label: 'Aidants' },
  { href: '/#etudiants', label: 'Intervenants' },
  { href: '/#suivi', label: 'Suivi' },
  { href: '/#pourquoi', label: 'Pourquoi AlterAges' },
];

/* Liens contextuels lorsqu'on est sur la page dédiée aux étudiants —
 * ancres internes vers les sections de la page. */
const etudiantsNav: ReadonlyArray<NavItem> = [
  { href: '#missions', label: 'Missions' },
  { href: '#pourquoi', label: 'Avantages' },
  { href: '#formation', label: 'Formation' },
  { href: '#parcours', label: 'Démarche' },
];

/**
 * Header public — nav contextuelle (landing vs /etudiants) + 2 CTA terracotta
 * côte à côte à droite : "Vous êtes étudiant ?" (lien vers /etudiants, masqué
 * quand on y est déjà) et "Se connecter" (ouvre la modal d'authentification via
 * `InterestButton`). Sur mobile, seul "Se connecter" reste visible.
 */
export function PublicHeader() {
  const pathname = usePathname();
  const isEtudiants = pathname === '/etudiants';

  const navItems = isEtudiants ? etudiantsNav : landingNav;

  return (
    <header className="border-bd-light/80 bg-cream/90 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md">
      <div className="container flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <Image
            src="/images/transparent-logo-terra.svg"
            alt="Logo AlterAges"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="text-deep font-serif text-[1.6rem] leading-none tracking-tight">
            Alter<em className="text-terra font-normal italic">Ages</em>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-mid hover:text-terra text-[0.78rem] uppercase tracking-[0.07em] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {isEtudiants ? null : (
              <Link
                href="/etudiants"
                className="bg-terra hover:bg-terra-dark whitespace-nowrap rounded-sm px-[1.1rem] py-[0.4rem] text-[0.78rem] uppercase tracking-[0.07em] text-white transition-colors"
              >
                Vous êtes étudiant ?
              </Link>
            )}
            <InterestButton variant="nav" label="Se connecter" location="header" />
          </div>
        </div>

        <InterestButton variant="nav-short" label="Se connecter" location="header_mobile" />
      </div>
    </header>
  );
}
