import { CheckCircle2, type LucideIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ChecklistItemProps {
  children: React.ReactNode;
  /** Icône à gauche (défaut : CheckCircle2). */
  icon?: LucideIcon;
  className?: string;
}

/**
 * Élément de liste à puce — fond warm avec barre latérale terra.
 * À utiliser à l'intérieur d'un `<ul className="flex flex-col gap-3">`.
 */
export function ChecklistItem({
  children,
  icon: Icon = CheckCircle2,
  className,
}: ChecklistItemProps) {
  return (
    <li
      className={cn(
        'flex items-start gap-3 rounded-lg border-l-2 border-terra bg-warm px-4 py-3 text-[0.88rem] leading-[1.65] text-mid',
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-terra" aria-hidden />
      <span>{children}</span>
    </li>
  );
}
