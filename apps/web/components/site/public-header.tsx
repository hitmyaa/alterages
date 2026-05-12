'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { href: string; label: string };

/* Liens par défaut — landing + pages neutres (a-propos, tarifs, etc.). */
const landingNav: ReadonlyArray<NavItem> = [
  { href: '/#prescripteurs', label: 'Prescripteurs' },
  { href: '/#etudiants', label: 'Étudiants' },
  { href: '/#suivi', label: 'Suivi' },
  { href: '/#tarif', label: 'Tarification' },
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
 * Header public — adapte sa navigation et son CTA principal selon la route :
 * - `/etudiants` : ancres internes à la page + CTA "Je suis intéressé(e)"
 * - autres pages : liens vers les sections de la landing + CTA "Nous contacter"
 */
export function PublicHeader() {
  const pathname = usePathname();
  const isEtudiants = pathname === '/etudiants';

  const navItems = isEtudiants ? etudiantsNav : landingNav;
  const ctaLabel = isEtudiants ? 'Je suis intéressé(e)' : 'Nous contacter';
  const ctaShort = isEtudiants ? 'Intéressé(e)' : 'Contact';
  const ctaHref = isEtudiants ? '#rejoindre' : '/#contact';

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-bd-light/80 bg-cream/90 backdrop-blur-md">
      <div className="container flex h-[76px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/transparent-logo-terra.svg"
            alt="Logo AlterAges"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="font-serif text-[1.6rem] leading-none tracking-tight text-deep">
            Alter<em className="font-normal italic text-terra">Ages</em>
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.78rem] uppercase tracking-[0.07em] text-mid transition-colors hover:text-terra"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            className="rounded-sm bg-terra px-[1.1rem] py-[0.4rem] text-[0.78rem] uppercase tracking-[0.07em] text-white transition-colors hover:bg-terra-dark"
          >
            {ctaLabel}
          </Link>
        </nav>

        <Link
          href={ctaHref}
          className="rounded-sm bg-terra px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-terra-dark md:hidden"
        >
          {ctaShort}
        </Link>
      </div>
    </header>
  );
}
