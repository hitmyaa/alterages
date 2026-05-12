import Image from 'next/image';
import Link from 'next/link';

/**
 * Layout de l'espace étudiant — placeholder.
 *
 * À terme : sidebar navigation (Profil, Documents, Missions, Formation,
 * Messagerie...), header avec avatar et notifs. Pour l'instant, header
 * minimal en attendant la mise en place du dashboard authentifié.
 */
export default function EspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
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

          <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-light">
            Espace étudiant
          </span>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
