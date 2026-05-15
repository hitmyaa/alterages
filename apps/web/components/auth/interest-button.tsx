'use client';

import { ArrowRight } from 'lucide-react';
import * as React from 'react';

import { GA_EVENTS, trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

import { useAuthModal } from './auth-modal-provider';

type Variant = 'primary' | 'on-dark' | 'on-terra' | 'nav' | 'nav-short';

const variantClasses: Record<Variant, string> = {
  /* CTA principal — bouton terracotta avec micro-shift d'icône au hover */
  primary:
    'group inline-flex items-center gap-2 rounded-sm bg-terra px-7 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-terra-dark hover:shadow-md',
  /* CTA blanc sur fond sombre (utilisé dans la section Formation deep) */
  'on-dark':
    'group inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-6 py-2.5 text-sm font-medium text-deep transition-opacity hover:opacity-90',
  /* CTA blanc sur fond terracotta (utilisé dans le CTA final) */
  'on-terra':
    'group inline-flex items-center gap-2 rounded-sm bg-white px-7 py-3 text-sm font-medium text-terra-dark shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
  /* Bouton du header — version desktop */
  nav: 'rounded-sm bg-terra px-[1.1rem] py-[0.4rem] text-[0.78rem] uppercase tracking-[0.07em] text-white transition-colors hover:bg-terra-dark',
  /* Bouton du header — version mobile compacte */
  'nav-short':
    'rounded-sm bg-terra px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-terra-dark md:hidden',
};

export interface InterestButtonProps {
  variant?: Variant;
  label?: string;
  /** Affiche une flèche après le label (active uniquement sur les variantes avec `group`). */
  withArrow?: boolean;
  className?: string;
  /** Identifiant de l'emplacement du bouton dans la page (ex: `hero`,
   *  `pourquoi`, `formation`, `parcours`, `final`, `nav`). Remonté à GA4
   *  pour mesurer quel CTA convertit le mieux. */
  location?: string;
}

/**
 * CTA universel "Je suis intéressé(e)" — ouvre la modal d'authentification.
 * Remplace tous les `<a href="#rejoindre">` et `<a href="/#contact">` sur la
 * page étudiants.
 */
export function InterestButton({
  variant = 'primary',
  label = 'Je suis intéressé(e)',
  withArrow = true,
  className,
  location,
}: InterestButtonProps) {
  const { open } = useAuthModal();
  const showArrow = withArrow && variant !== 'nav' && variant !== 'nav-short';

  const handleClick = () => {
    trackEvent(GA_EVENTS.CTA_CLICK, {
      cta_label: label,
      cta_location: location ?? 'unknown',
      cta_type: 'interest',
    });
    open();
  };

  return (
    <button type="button" onClick={handleClick} className={cn(variantClasses[variant], className)}>
      {label}
      {showArrow ? (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </button>
  );
}
