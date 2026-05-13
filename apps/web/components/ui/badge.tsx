import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors',
  {
    variants: {
      variant: {
        sage: 'bg-sage-light/20 text-sage',
        'sage-outline':
          'border border-sage-light/60 bg-warm text-sage shadow-sm normal-case tracking-[0.12em]',
        terra: 'bg-terra/10 text-terra',
        'terra-outline': 'border border-terra/30 bg-terra/5 text-terra',
        'on-dark': 'bg-white/10 text-white/85',
        muted: 'bg-bd-light text-mid',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-[0.66rem]',
        default: 'px-3 py-0.5 text-[0.7rem]',
        lg: 'px-3.5 py-1.5 text-[0.72rem]',
      },
    },
    defaultVariants: {
      variant: 'sage',
      size: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Affiche un point pulsant à gauche du badge (statut "live"). */
  pulse?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pulse, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {pulse ? (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
        ) : null}
        {children}
      </span>
    );
  },
);
Badge.displayName = 'Badge';

export { badgeVariants };
