import type { LucideIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TimelineStep {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Petit pavé terra sous la description (ex: "Rapide", "À votre rythme"). */
  note?: string;
}

export interface StepsTimelineProps {
  steps: ReadonlyArray<TimelineStep>;
  className?: string;
}

/**
 * Timeline horizontale (sur md+) avec ronds numérotés terra reliés par
 * une ligne dégradée terra→sauge. Au hover, le numéro est remplacé par
 * l'icône Lucide. En mobile, les étapes s'empilent verticalement.
 */
export function StepsTimeline({ steps, className }: StepsTimelineProps) {
  /* Inset de la ligne : du centre du 1er cercle au centre du dernier.
   * Avec n colonnes équi-réparties (flex-1), chaque colonne fait 100/n %,
   * donc la moitié = 50/n %. */
  const lineInset = `${50 / steps.length}%`;

  return (
    <ol
      className={cn(
        'relative flex flex-col gap-10 md:flex-row md:gap-0',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute top-6 hidden h-px md:block"
        style={{
          left: lineInset,
          right: lineInset,
          background: 'linear-gradient(to right, #B85C2C, #5C7A62)',
        }}
      />
      {steps.map(({ icon: Icon, title, description, note }, idx) => (
        <li
          key={title}
          className="group relative flex flex-col items-center text-center md:flex-1 md:px-3"
        >
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-terra bg-warm font-sans text-base font-semibold tabular-nums text-terra transition-all group-hover:bg-terra group-hover:text-white">
            <span className="group-hover:hidden">{idx + 1}</span>
            <Icon className="hidden h-5 w-5 group-hover:block" aria-hidden />
          </div>
          <h3 className="mt-4 font-serif text-[0.95rem] text-deep">{title}</h3>
          <p className="mt-1 max-w-[300px] text-[0.82rem] leading-[1.55] text-mid">
            {description}
          </p>
          {note ? (
            <span className="mt-3 inline-flex items-center rounded-full bg-terra/10 px-3 py-1.5 text-[0.7rem] font-medium leading-none text-terra md:mt-auto">
              {note}
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
