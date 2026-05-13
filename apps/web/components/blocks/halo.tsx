import * as React from 'react';

import { cn } from '@/lib/utils';

type HaloColor = 'terra' | 'sage';
type HaloPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
type HaloSize = 'md' | 'lg' | 'xl';

const colorClasses: Record<HaloColor, string> = {
  terra: 'halo-terra',
  sage: 'halo-sage',
};

const positionClasses: Record<HaloPosition, string> = {
  'top-right': '-right-40 -top-40',
  'top-left': '-left-40 -top-40',
  'bottom-right': '-right-40 -bottom-60',
  'bottom-left': '-left-40 -bottom-60',
  center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
};

const sizeClasses: Record<HaloSize, string> = {
  md: 'h-[400px] w-[400px]',
  lg: 'h-[500px] w-[500px]',
  xl: 'h-[650px] w-[650px]',
};

export interface HaloProps {
  color?: HaloColor;
  position?: HaloPosition;
  size?: HaloSize;
  className?: string;
}

/**
 * Auréole diffuse en arrière-plan d'une section. Pensé pour être posé
 * comme premier enfant d'un wrapper `relative overflow-hidden`. Toujours
 * `pointer-events-none` et `aria-hidden`.
 */
export function Halo({
  color = 'terra',
  position = 'top-right',
  size = 'xl',
  className,
}: HaloProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full',
        colorClasses[color],
        positionClasses[position],
        sizeClasses[size],
        className,
      )}
    />
  );
}
