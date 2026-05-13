import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CTABandProps {
  /** Texte fort à gauche (devient `<strong>`). */
  title: React.ReactNode;
  /** Texte secondaire après le tiret. */
  description?: React.ReactNode;
  /** Libellé du bouton à droite. */
  ctaLabel: string;
  /** URL du bouton — utilise Link Next si interne. */
  ctaHref: string;
  /** Posée sur section sombre : fond terra/10 + bouton blanc. Sinon fond terra plein + bouton blanc. */
  invert?: boolean;
  className?: string;
}

/**
 * Bande horizontale d'appel à l'action. Réside généralement en fin de
 * section ou de page (au-dessus du footer / contact).
 */
export function CTABand({
  title,
  description,
  ctaLabel,
  ctaHref,
  invert = false,
  className,
}: CTABandProps) {
  const isExternal = ctaHref.startsWith('http');
  const Tag = isExternal ? 'a' : Link;
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {};

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl px-6 py-4 md:flex-row md:items-center md:justify-between md:gap-8',
        invert
          ? 'border border-terra/30 bg-terra/10'
          : 'bg-terra text-white',
        className,
      )}
    >
      <p
        className={cn(
          'text-sm md:whitespace-nowrap',
          invert ? 'text-white/75' : 'text-white/90',
        )}
      >
        <strong
          className={cn(
            'font-medium',
            invert ? 'text-white' : 'text-white',
          )}
        >
          {title}
        </strong>
        {description ? (
          <>
            <span
              className={cn(
                'mx-2',
                invert ? 'text-white/30' : 'text-white/50',
              )}
            >
              —
            </span>
            {description}
          </>
        ) : null}
      </p>
      <Tag
        href={ctaHref}
        className={cn(
          'group inline-flex shrink-0 items-center gap-2 self-start rounded-sm px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 md:self-auto',
          invert ? 'bg-white text-deep' : 'bg-white text-terra',
        )}
        {...externalProps}
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Tag>
    </div>
  );
}
