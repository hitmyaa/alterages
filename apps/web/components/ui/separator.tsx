import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Trait dégradé terra→sauge (utilisé sous les timelines / sections). */
  gradient?: boolean;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', gradient = false, ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'shrink-0',
          isHorizontal ? 'h-px w-full' : 'h-full w-px',
          gradient ? 'from-terra to-sage bg-gradient-to-r' : 'bg-bd',
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = 'Separator';
