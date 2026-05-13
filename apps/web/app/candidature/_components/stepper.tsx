import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface StepperStep {
  id: number;
  label: string;
}

export interface StepperProps {
  steps: ReadonlyArray<StepperStep>;
  current: number;
}

/**
 * Indicateur de progression du tunnel de candidature.
 * Visualise les 3 étapes avec leur statut : done / active / upcoming.
 */
export function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {steps.map((step, idx) => {
        const isDone = step.id < current;
        const isActive = step.id === current;
        const isLast = idx === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <li className="flex items-center gap-2.5">
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-medium transition-colors',
                  isDone && 'bg-sage text-white',
                  isActive && 'bg-terra text-white',
                  !isDone && !isActive && 'border border-bd bg-warm text-light',
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" aria-hidden /> : step.id}
              </span>
              <span
                className={cn(
                  'hidden text-[0.78rem] font-medium uppercase tracking-[0.06em] sm:inline',
                  isDone && 'text-sage',
                  isActive && 'text-terra',
                  !isDone && !isActive && 'text-light',
                )}
              >
                {step.label}
              </span>
            </li>
            {!isLast ? (
              <li
                aria-hidden
                className="h-px w-6 flex-shrink-0 bg-bd-light sm:w-10"
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
