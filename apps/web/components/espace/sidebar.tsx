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
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-md border border-bd bg-warm text-mid shadow-soft transition-colors hover:border-terra hover:text-terra md:hidden"
      >
        <Menu className="h-4 w-4" aria-hidden />
      </button>

      {/* Backdrop mobile */}
      {mobileOpen ? (
        <div
          onClick={() => setMobileOpen(false)}
          aria-hidden
          className="fixed inset-0 z-40 bg-deep/50 backdrop-blur-sm md:hidden"
        />
      ) : null}

      {/* Sidebar */}
      <aside
        aria-label="Navigation espace étudiant"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-bd-light bg-warm transition-transform duration-200 ease-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        {/* Header : logo + bouton fermer (mobile) */}
        <div className="flex items-center justify-between border-b border-bd-light px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/transparent-logo-terra.svg"
              alt="Logo AlterAges"
              width={32}
              height={32}
              priority
              className="h-8 w-8 object-contain"
            />
            <span className="font-serif text-[1.3rem] leading-none tracking-tight text-deep">
              Alter<em className="font-normal italic text-terra">Ages</em>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-mid transition-colors hover:text-terra md:hidden"
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
                        ? 'bg-terra/10 font-medium text-terra'
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
        <div ref={profileRef} className="relative border-t border-bd-light p-3">
          {/* Dropdown menu — s'ouvre au-dessus du bouton profil */}
          {profileMenuOpen ? (
            <div className="absolute inset-x-3 bottom-full mb-2 overflow-hidden rounded-md border border-bd bg-white shadow-soft-lg">
              <Link
                href="/espace/profil"
                className="flex items-center gap-2.5 px-3 py-2.5 text-[0.85rem] text-mid transition-colors hover:bg-cream hover:text-terra"
              >
                <User className="h-4 w-4 shrink-0" aria-hidden />
                Profil
              </Link>
              <Link
                href="/espace/formation"
                className="flex items-center gap-2.5 border-t border-bd-light px-3 py-2.5 text-[0.85rem] text-mid transition-colors hover:bg-cream hover:text-terra"
              >
                <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
                Ma formation
              </Link>
              <Link
                href="/espace/parametres"
                className="flex items-center gap-2.5 border-t border-bd-light px-3 py-2.5 text-[0.85rem] text-mid transition-colors hover:bg-cream hover:text-terra"
              >
                <Settings className="h-4 w-4 shrink-0" aria-hidden />
                Paramètres
              </Link>
              <form action="/auth/sign-out" method="post" className="border-t border-bd-light">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[0.85rem] text-mid transition-colors hover:bg-cream hover:text-destructive"
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terra text-[0.78rem] font-medium text-white"
            >
              {user.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.85rem] font-medium text-deep">
                {user.name}
              </span>
              <span className="block truncate text-[0.72rem] text-mid">
                {user.email}
              </span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
