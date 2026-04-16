import Link from 'next/link';

const navSections = [
  { href: '/#prescripteurs', label: 'Prescripteurs' },
  { href: '/#etudiants', label: 'Étudiants' },
  { href: '/#suivi', label: 'Suivi' },
  { href: '/#tarif', label: 'Tarification' },
] as const;

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-bd-light/80 bg-cream/90 backdrop-blur-md">
        <div className="container flex h-[58px] items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-terra transition-opacity hover:opacity-80"
          >
            AlterAges
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
            {navSections.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.78rem] uppercase tracking-[0.07em] text-mid transition-colors hover:text-terra"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="rounded-sm bg-terra px-[1.1rem] py-[0.4rem] text-[0.78rem] uppercase tracking-[0.07em] text-white transition-colors hover:bg-terra-dark"
            >
              Nous contacter
            </Link>
          </nav>

          <Link
            href="/#contact"
            className="rounded-sm bg-terra px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-terra-dark md:hidden"
          >
            Contact
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-[58px]">{children}</main>

      <footer className="bg-deep px-6 py-10 text-center text-[0.78rem] leading-loose tracking-wide text-white/75">
        <p>
          <strong className="font-medium text-white">AlterAges</strong>
          <span className="mx-2 opacity-40">·</span>
          Projet en construction
          <span className="mx-2 opacity-40">·</span>
          Lancement septembre 2026
          <span className="mx-2 opacity-40">·</span>
          Lyon (69)
        </p>
        <p>
          Faustine Sornay
          <span className="mx-2 opacity-40">·</span>
          <a
            href="mailto:contact@alter-ages.fr"
            className="underline-offset-2 hover:underline"
          >
            contact@alter-ages.fr
          </a>
          <span className="mx-2 opacity-40">·</span>
          <a href="tel:+33673877571" className="underline-offset-2 hover:underline">
            06 73 87 75 71
          </a>
        </p>
        <p className="mt-2 text-[0.7rem] text-white/45">
          Démarches d'obtention de l'agrément SAP en cours d'instruction. Aucun service
          actuellement commercialisé.
        </p>
      </footer>
    </div>
  );
}
