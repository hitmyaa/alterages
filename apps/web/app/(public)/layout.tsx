import Image from 'next/image';
import Link from 'next/link';

import { AuthModal } from '@/components/auth/auth-modal';
import { AuthModalProvider } from '@/components/auth/auth-modal-provider';
import { PublicHeader } from '@/components/site/public-header';

const navLinks: ReadonlyArray<{ href: string; label: string; disabled?: boolean }> = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/etudiants', label: 'Rejoindre AlterAges' },
  { href: '/tarifs', label: 'Tarification', disabled: true },
];

const legalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Confidentialité' },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      <div className="bg-background flex min-h-screen flex-col">
        <PublicHeader />

        <main className="flex-1 pt-[76px]">{children}</main>

        <footer className="bg-deep text-white/75">
          <div className="container grid gap-12 px-6 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
              >
                <Image
                  src="/images/transparent-logo-terra.svg"
                  alt="Logo AlterAges"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span className="font-serif text-[1.45rem] leading-none tracking-tight text-white">
                  Alter<em className="text-terra-light font-normal italic">Ages</em>
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-[0.85rem] leading-[1.8] text-white/65">
                Association lyonnaise qui réinvente l’aide à domicile par le lien
                intergénérationnel. Lancement septembre 2026.
              </p>
            </div>

            <FooterColumn title="Le projet" links={navLinks} />
            <FooterColumn title="Informations" links={legalLinks} />

            <div>
              <FooterColumnTitle>Contact</FooterColumnTitle>
              <ul className="mt-5 flex flex-col gap-2 text-[0.85rem]">
                <li>
                  <a
                    href="mailto:contact@alter-ages.fr"
                    className="hover:text-terra-light text-white/80 underline-offset-4 transition-colors hover:underline"
                  >
                    contact@alter-ages.fr
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33673877571"
                    className="hover:text-terra-light text-white/80 underline-offset-4 transition-colors hover:underline"
                  >
                    06 73 87 75 71
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/faustine-sornay/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-terra-light text-white/80 underline-offset-4 transition-colors hover:underline"
                  >
                    LinkedIn — Faustine Sornay
                  </a>
                </li>
                <li className="mt-1 text-white/55">Lyon et agglomération (69)</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.08]">
            <div className="container flex flex-col gap-3 px-6 py-6 text-[0.72rem] leading-[1.7] text-white/45 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} AlterAges · Faustine Sornay · Lyon</p>
              <p className="max-w-xl md:text-right">
                Démarches d’obtention de l’agrément SAP en cours d’instruction. Aucun service n’est
                actuellement commercialisé.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <AuthModal />
    </AuthModalProvider>
  );
}

function FooterColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <strong className="block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/55">
      {children}
    </strong>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string; disabled?: boolean }>;
}) {
  return (
    <div>
      <FooterColumnTitle>{title}</FooterColumnTitle>
      <ul className="mt-5 flex flex-col gap-2 text-[0.85rem]">
        {links.map((link) =>
          link.disabled ? (
            <li key={link.href} className="flex items-center gap-2 text-white/35">
              <span>{link.label}</span>
              <span className="text-[0.7rem] uppercase tracking-[0.08em] text-white/30">
                À venir
              </span>
            </li>
          ) : (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-terra-light text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
