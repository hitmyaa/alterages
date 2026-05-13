import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InfoCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  /** Variante sombre (fond deep, texte blanc). */
  invert?: boolean;
  className?: string;
}

/**
 * Carte texte simple, sans icône — titre serif + paragraphe.
 * Utilisée notamment dans le bloc tarif pour décrire les composantes du coût.
 */
export function InfoCard({ title, description, invert = false, className }: InfoCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl px-6 py-5',
        invert ? 'bg-deep text-white' : 'border-bd bg-warm border',
        className,
      )}
    >
      <h4 className={cn('font-serif text-[0.98rem]', invert ? 'text-white' : 'text-deep')}>
        {title}
      </h4>
      <p
        className={cn('mt-1.5 text-[0.83rem] leading-[1.8]', invert ? 'text-white/65' : 'text-mid')}
      >
        {description}
      </p>
    </div>
  );
}
