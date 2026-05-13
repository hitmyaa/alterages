import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Accordéon léger basé sur les éléments natifs `<details>/<summary>`.
 * Pas de dépendance Radix — suffisant pour les FAQs marketing et accessible
 * par défaut. Pour des animations avancées ou un mode "single-open",
 * remonter sur `@radix-ui/react-accordion`.
 */

export const Accordion = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('divide-bd border-bd bg-warm divide-y rounded-xl border', className)}
      {...props}
    />
  ),
);
Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  /** Titre cliquable de l'item. */
  question: React.ReactNode;
  /** Ouvre l'item par défaut. */
  defaultOpen?: boolean;
  /** Nom du groupe — si plusieurs items partagent le même `groupName`, seul
   *  un seul peut être ouvert à la fois (attribut HTML `<details name>` natif). */
  groupName?: string;
}

export const AccordionItem = React.forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ className, question, defaultOpen, groupName, children, ...props }, ref) => (
    <details
      ref={ref}
      open={defaultOpen}
      name={groupName}
      className={cn('group', className)}
      {...props}
    >
      <summary className="text-deep flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[0.92rem] font-medium marker:hidden [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <ChevronDown
          aria-hidden
          className="text-mid group-open:text-terra h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="text-mid px-5 pb-5 pt-0 text-[0.88rem] leading-[1.75]">{children}</div>
    </details>
  ),
);
AccordionItem.displayName = 'AccordionItem';
