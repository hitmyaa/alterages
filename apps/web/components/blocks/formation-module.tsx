import { ChevronDown, type LucideIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface FormationModuleProps {
  /** Petit pavé en haut de la carte (ex: "Module 1", "Validation"). */
  badge: string;
  /** Titre serif. */
  title: string;
  /** Tagline courte affichée dans l'en-tête (1 phrase). */
  description: string;
  /** Points détaillés — révélés à l'ouverture de la carte. */
  points: ReadonlyArray<string>;
  /** Note discrète en bas du détail (ex: "Obligatoire pour les missions de mobilité"). */
  note?: string;
  /** Variante mise en avant (terra/10) — pour le module de validation finale. */
  highlight?: boolean;
  /** Icône optionnelle à gauche du badge. */
  icon?: LucideIcon;
  /** Nom du groupe — si plusieurs cartes partagent le même `groupName`, seule
   *  une peut être ouverte à la fois (attribut HTML `<details name>` natif). */
  groupName?: string;
  /** Ouvre la carte par défaut. */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Carte de module de formation — pattern accordion. Au repos, on n'affiche
 * que les "infos principales" (badge + titre + tagline). Le détail (points
 * + note) est révélé au clic via un `<details>` natif. Accessible par
 * défaut, server-side renderable, zéro JS.
 *
 * La variante `highlight` (validation finale) passe en accents terra.
 */
export function FormationModule({
  badge,
  title,
  description,
  points,
  note,
  highlight = false,
  icon: Icon,
  groupName,
  defaultOpen,
  className,
}: FormationModuleProps) {
  return (
    <details
      name={groupName}
      open={defaultOpen}
      className={cn(
        'group rounded-xl border transition-colors',
        highlight
          ? 'border-terra/40 bg-terra/[0.08] open:border-terra/60'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 open:border-white/25 open:bg-white/[0.05]',
        className,
      )}
    >
      <summary
        className={cn(
          'flex cursor-pointer items-center gap-5 px-6 py-5',
          'list-none marker:hidden [&::-webkit-details-marker]:hidden',
        )}
      >
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-[0.1em]',
            highlight
              ? 'bg-terra/20 text-terra-light'
              : 'bg-white/10 text-white/65',
          )}
        >
          {Icon ? <Icon className="h-3 w-3" aria-hidden /> : null}
          {badge}
        </span>

        <div className="flex-1">
          <h3 className="font-serif text-[1.02rem] leading-tight text-white">
            {title}
          </h3>
          <p className="mt-1 text-[0.82rem] leading-[1.55] text-white/55">
            {description}
          </p>
        </div>

        <ChevronDown
          aria-hidden
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180',
            highlight ? 'text-terra-light' : 'text-white/40 group-open:text-white/70',
          )}
        />
      </summary>

      <div className="border-t border-white/[0.06] px-6 pb-6 pt-5">
        <ul className="flex flex-col gap-2">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-[0.84rem] leading-[1.65] text-white/65"
            >
              <span
                aria-hidden
                className="mt-[0.55rem] inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-terra"
              />
              {point}
            </li>
          ))}
        </ul>

        {note ? (
          <p className="mt-5 rounded-md bg-white/[0.04] px-3 py-2 text-[0.78rem] italic text-white/45">
            {note}
          </p>
        ) : null}
      </div>
    </details>
  );
}
