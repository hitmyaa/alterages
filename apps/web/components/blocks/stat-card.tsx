import * as React from 'react';

import { cn } from '@/lib/utils';

export interface StatCardProps {
  /** Chiffre principal (ex: "50"). */
  value: React.ReactNode;
  /** Suffixe en exposant (ex: "%"). */
  suffix?: string;
  /** Titre en gras (ex: "Crédit d'impôt"). */
  title: React.ReactNode;
  /** Description sous le titre. */
  description?: React.ReactNode;
  className?: string;
}

/**
 * Bloc mis en avant — gros chiffre terra-light sur fond deep, accompagné
 * d'un titre fort et d'une description courte. Format paysage compact.
 */
export function StatCard({
  value,
  suffix,
  title,
  description,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-5 rounded-xl bg-deep px-6 py-5 text-white',
        className,
      )}
    >
      <div className="font-sans text-[2.75rem] font-bold leading-none tracking-tight text-terra-light tabular-nums">
        {value}
        {suffix ? (
          <span className="ml-0.5 align-top text-xl font-semibold">{suffix}</span>
        ) : null}
      </div>
      <div className="text-[0.83rem] leading-[1.75] text-white/60">
        <strong className="block font-medium text-white">{title}</strong>
        {description}
      </div>
    </div>
  );
}
