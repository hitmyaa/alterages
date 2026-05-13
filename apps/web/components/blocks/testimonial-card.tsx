import { Quote } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TestimonialCardProps {
  /** Texte cité (sans guillemets — ajoutés automatiquement). */
  quote: string;
  /** Rôle / fonction de l'auteur. */
  role: string;
  /** Métadonnée additionnelle (date, contexte). */
  meta?: string;
  /** Variante sombre (fond `bg-white/[0.04]` pour usage sur section deep). */
  invert?: boolean;
  className?: string;
}

/**
 * Témoignage avec icône Quote, citation en italique et bloc auteur séparé
 * par un fin trait. Existe en variante claire (sur warm/cream) et sombre.
 */
export function TestimonialCard({
  quote,
  role,
  meta,
  invert = false,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        'rounded-xl p-6',
        invert
          ? 'border border-white/[0.08] bg-white/[0.04]'
          : 'border border-bd bg-warm',
        className,
      )}
    >
      <Quote
        className={cn('h-5 w-5', invert ? 'text-terra-light' : 'text-terra')}
        aria-hidden
      />
      <p
        className={cn(
          'mt-4 text-[0.88rem] italic leading-[1.8]',
          invert ? 'text-white/75' : 'text-mid',
        )}
      >
        &laquo; {quote} &raquo;
      </p>
      <div
        className={cn(
          'mt-4 border-t pt-3 text-[0.74rem] tracking-wide',
          invert ? 'border-white/[0.08]' : 'border-bd',
        )}
      >
        <strong
          className={cn(
            'block font-medium',
            invert ? 'text-white/55' : 'text-deep',
          )}
        >
          {role}
        </strong>
        {meta ? (
          <span className={invert ? 'text-white/35' : 'text-light'}>{meta}</span>
        ) : null}
      </div>
    </article>
  );
}
