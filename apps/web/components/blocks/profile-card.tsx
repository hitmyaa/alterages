import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ProfileCardProps {
  name: string;
  meta: string;
  badge: string;
  /** Couleur d'accent du cercle initiale (hex). */
  accent?: string;
  className?: string;
}

/**
 * Carte profil illustratif (étudiant). Initiale + nom + parcours + badge
 * de missions. Pas de photo — volontairement abstrait / illustratif.
 */
export function ProfileCard({
  name,
  meta,
  badge,
  accent = '#D4784A',
  className,
}: ProfileCardProps) {
  const initial = name.charAt(0);
  return (
    <article
      className={cn(
        'border-bd bg-warm hover:border-sage-light group rounded-xl border p-5 text-center transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div
        className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full font-sans text-lg font-semibold text-white"
        style={{ background: accent }}
        aria-hidden
      >
        {initial}
      </div>
      <div className="text-deep text-[0.92rem] font-medium">{name}</div>
      <div className="text-mid mt-1 text-[0.75rem] leading-snug">{meta}</div>
      <span className="bg-sage-light/20 text-sage mt-3 inline-block rounded-full px-3 py-0.5 text-[0.66rem] font-medium tracking-wide">
        {badge}
      </span>
    </article>
  );
}
