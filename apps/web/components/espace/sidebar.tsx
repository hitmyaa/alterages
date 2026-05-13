'use client';

import {
  Calendar,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*                          NAV ITEMS                                  */
/* ------------------------------------------------------------------ */

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Si `true`, match strict de l'URL (pour la racine `/espace`). */
  exact?: boolean;
}

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { href: '/espace', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/espace/planning', label: 'Planning', icon: Calendar },
  { href: '/espace/beneficiaire', label: 'Bénéficiaire', icon: HeartHandshake },
  { href: '/espace/gains', label: 'Gains et bulletins', icon: Wallet },
];

export interface SidebarUser {
  name: string;
  email: string;
  initials: string;
}

/* ------------------------------------------------------------------ */
/*                          COMPONENT                                  */
/* ------------------------------------------------------------------ */

/**
 * Sidebar de l'espace étudiant — navigation principale.
 *
 * Desktop : barre latérale fixe (240px) toujours visible.
 * Mobile : drawer slide-in depuis la gauche, déclenché par un bouton
 * hamburger fixé en haut à gauche. Backdrop semi-transparent pour
 * fermer au clic.
 *
 * Le contenu est pensé pour rester identique à terme dans une app
 * mobile native (mêmes labels, mêmes icônes) — seule la chrome
 * (sidebar vs bottom nav) sera adaptée.
 */
export function EspaceSidebar({ user }: { user: SidebarUser }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);

  /* Ferme tout au changement de route. */
  React.useEffect(() => {
    setMobileOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  /* Esc pour fermer (drawer mobile OU menu profil). */
  React.useEffect(() => {
    if (!mobileOpen && !profileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMobileOpen(false);
      setProfileMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mobileOpen, profileMenuOpen]);

  /* Click outside : ferme le menu profil. */
  React.useEffect(() => {
    if (!profileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileMenuOpen]);

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      {/* Hamburger — visible uniquement sur mobile */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={mobileOpen}
        className="border-bd bg-warm text-mid shadow-soft hover:border-terra hover:text-terra fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-md border transition-colors md:hidden"
      >
        <Menu className="h-4 w-4" aria-hidden />
      </button>

      {/* Backdrop mobile */}
      {mobileOpen ? (
        <div
          onClick={() => setMobileOpen(false)}
          aria-hidden
          className="bg-deep/50 fixed inset-0 z-40 backdrop-blur-sm md:hidden"
        />
      ) : null}

      {/* Sidebar */}
      <aside
        aria-label="Navigation espace étudiant"
        className={cn(
          'border-bd-light bg-warm fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r transition-transform duration-200 ease-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        {/* Header : logo + bouton fermer (mobile) */}
        <div className="border-bd-light flex items-center justify-between border-b px-5 py-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image
              src="/images/transparent-logo-terra.svg"
              alt="Logo AlterAges"
              width={32}
              height={32}
              priority
              className="h-8 w-8 object-contain"
            />
            <span className="text-deep font-serif text-[1.3rem] leading-none tracking-tight">
              Alter<em className="text-terra font-normal italic">Ages</em>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
            className="text-mid hover:text-terra flex h-8 w-8 items-center justify-center rounded-md transition-colors md:hidden"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.88rem] transition-colors',
                      active
                        ? 'bg-terra/10 text-terra font-medium'
                        : 'text-mid hover:bg-cream hover:text-terra',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile footer + dropdown menu */}
        <div ref={profileRef} className="border-bd-light relative border-t p-3">
          {/* Dropdown menu — s'ouvre au-dessus du bouton profil */}
          {profileMenuOpen ? (
            <div className="border-bd shadow-soft-lg absolute inset-x-3 bottom-full mb-2 overflow-hidden rounded-md border bg-white">
              <Link
                href="/espace/profil"
                className="text-mid hover:bg-cream hover:text-terra flex items-center gap-2.5 px-3 py-2.5 text-[0.85rem] transition-colors"
              >
                <User className="h-4 w-4 shrink-0" aria-hidden />
                Profil
              </Link>
              <Link
                href="/espace/formation"
                className="border-bd-light text-mid hover:bg-cream hover:text-terra flex items-center gap-2.5 border-t px-3 py-2.5 text-[0.85rem] transition-colors"
              >
                <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
                Ma formation
              </Link>
              <Link
                href="/espace/parametres"
                className="border-bd-light text-mid hover:bg-cream hover:text-terra flex items-center gap-2.5 border-t px-3 py-2.5 text-[0.85rem] transition-colors"
              >
                <Settings className="h-4 w-4 shrink-0" aria-hidden />
                Paramètres
              </Link>
              <form action="/auth/sign-out" method="post" className="border-bd-light border-t">
                <button
                  type="submit"
                  className="text-mid hover:bg-cream hover:text-destructive flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[0.85rem] transition-colors"
                >
                  <LogOut className="h-4 w-4 shrink-0" aria-hidden />
                  Se déconnecter
                </button>
              </form>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setProfileMenuOpen((v) => !v)}
            aria-expanded={profileMenuOpen}
            aria-haspopup="menu"
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors',
              profileMenuOpen ? 'bg-cream' : 'hover:bg-cream',
            )}
          >
            <span
              aria-hidden
              className="bg-terra flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.78rem] font-medium text-white"
            >
              {user.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-deep block truncate text-[0.85rem] font-medium">
                {user.name}
              </span>
              <span className="text-mid block truncate text-[0.72rem]">{user.email}</span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
