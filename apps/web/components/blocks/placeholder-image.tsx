import * as React from 'react';

import { cn } from '@/lib/utils';

export interface PlaceholderImageProps {
  /** Ratio CSS (ex: '4/3', '16/9', '5/6'). Si non fourni, prend toute la hauteur du parent. */
  aspectRatio?: string;
  /** Libellé centré. */
  label?: string;
  /** Variante sombre pour fond deep. */
  invert?: boolean;
  className?: string;
}

/**
 * Pavé visuel temporaire pour les emplacements d'images à venir. À remplacer
 * par un `<Image>` Next quand l'asset final est livré.
 */
export function PlaceholderImage({
  aspectRatio,
  label = 'Image à venir',
  invert = false,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-xl border border-dashed',
        invert
          ? 'border-white/20 bg-white/[0.04] text-white/40'
          : 'border-bd bg-warm/60 text-light',
        className,
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em]">{label}</span>
    </div>
  );
}
