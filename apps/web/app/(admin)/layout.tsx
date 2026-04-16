import Link from 'next/link';

/**
 * Layout du back-office admin.
 *
 * La protection d'accès est assurée par `middleware.ts` à la racine du projet
 * (redirige vers `/login` si l'utilisateur n'est pas authentifié et admin).
 *
 * TODO: ajouter sidebar de navigation admin une fois les sections définies.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-muted/40">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/admin/dashboard" className="font-semibold">
            Alterages · Back-office
          </Link>
          <span className="text-xs text-muted-foreground">Administration</span>
        </div>
      </header>
      <main className="container flex-1 py-8">{children}</main>
    </div>
  );
}
