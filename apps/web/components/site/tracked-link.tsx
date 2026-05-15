'use client';

import * as React from 'react';

import { GA_EVENTS, trackEvent } from '@/lib/analytics';

export interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Identifiant de l'emplacement du CTA dans la page (ex: `hero`, `etudiants_section`). */
  ctaLocation: string;
  /** Label remonté à GA4. Par défaut, le texte enfant si c'est une string. */
  ctaLabel?: string;
}

/**
 * Lien `<a>` qui émet un event `cta_click` GA4 avant la navigation.
 *
 * GA4 utilise `navigator.sendBeacon` par défaut, donc l'event survit à la
 * navigation cross-page sans qu'on ait à intercepter le clic.
 */
export function TrackedLink({
  ctaLocation,
  ctaLabel,
  href,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    const label = ctaLabel ?? (typeof children === 'string' ? children : '');
    trackEvent(GA_EVENTS.CTA_CLICK, {
      cta_label: label,
      cta_location: ctaLocation,
      cta_type: 'link',
      destination: href ?? '',
    });
    onClick?.(event);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
