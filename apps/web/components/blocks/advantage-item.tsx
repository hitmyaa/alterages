import * as React from 'react';

import { cn } from '@/lib/utils';

export interface AdvantageItemProps {
  /** Chiffre ou symbole accroche, en gros, à gauche (ex: "~15€", "100%", "∞"). */
  value: React.ReactNode;
  /** Titre court de l'avantage. */
  title: string;
  /** Sous-titre explicatif. */
  description: string;
  className?: string;
}

/**
 * Ligne d'avantage façon « stat + bénéfice » — gros chiffre terra à gauche,
 * texte à droite. Pensée pour être empilée dans une liste avec séparateurs
 * fins (le composant fournit la bordure basse, le dernier item la masque).
 */
export function AdvantageItem({ value, title, description, className }: AdvantageItemProps) {
  return (
    <div
      className={cn(
        'border-bd-light flex items-center gap-4 border-b py-3.5 last:border-b-0',
        className,
      )}
    >
      <div className="text-terra min-w-[60px] font-sans text-[1.2rem] font-medium leading-none">
        {value}
      </div>
      <div>
        <strong className="text-deep block text-[0.88rem] font-medium">{title}</strong>
        <span className="text-mid block text-[0.8rem] leading-[1.55]">{description}</span>
      </div>
    </div>
  );
}
