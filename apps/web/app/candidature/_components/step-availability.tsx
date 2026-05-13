'use client';

import { Eraser, Moon, Sparkles, Sun } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*                        DATA / TYPES                                */
/* ------------------------------------------------------------------ */

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;

/* Créneaux de 2 heures entre 6h et 20h (7 créneaux). */
const SLOTS = [
  { label: '6h – 8h' },
  { label: '8h – 10h' },
  { label: '10h – 12h' },
  { label: '12h – 14h' },
  { label: '14h – 16h' },
  { label: '16h – 18h' },
  { label: '18h – 20h' },
] as const;

/** Clé d'une cellule : `${dayIdx}-${slotIdx}` (0..6 × 0..6). */
export type AvailabilityKey = string;

const cellKey = (day: number, slot: number) => `${day}-${slot}`;

/* Indices par catégorie pour les presets. */
const WEEKDAYS = [0, 1, 2, 3, 4] as const;
const WEEKEND = [5, 6] as const;
const EVENING_SLOTS = [5, 6] as const; // 16-18 + 18-20

/* ------------------------------------------------------------------ */
/*                         PRESETS                                     */
/* ------------------------------------------------------------------ */

interface Preset {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Calcule l'ensemble des clés du preset. */
  keys: () => Set<AvailabilityKey>;
}

const PRESETS: ReadonlyArray<Preset> = [
  {
    id: 'soirs-semaine',
    label: 'Soirs en semaine',
    icon: Moon,
    keys: () => {
      const set = new Set<AvailabilityKey>();
      WEEKDAYS.forEach((d) => EVENING_SLOTS.forEach((s) => set.add(cellKey(d, s))));
      return set;
    },
  },
  {
    id: 'weekends',
    label: 'Weekends',
    icon: Sun,
    keys: () => {
      const set = new Set<AvailabilityKey>();
      WEEKEND.forEach((d) => SLOTS.forEach((_, s) => set.add(cellKey(d, s))));
      return set;
    },
  },
  {
    id: 'all',
    label: 'Toute la semaine',
    icon: Sparkles,
    keys: () => {
      const set = new Set<AvailabilityKey>();
      DAYS.forEach((_, d) => SLOTS.forEach((_s, s) => set.add(cellKey(d, s))));
      return set;
    },
  },
];

/* ------------------------------------------------------------------ */
/*                         PROPS                                       */
/* ------------------------------------------------------------------ */

interface StepAvailabilityProps {
  value: ReadonlySet<AvailabilityKey>;
  onChange: (next: Set<AvailabilityKey>) => void;
  /** Bypass : l'étudiant cochera ses dispos plus tard depuis son espace. */
  unsetLater: boolean;
  onChangeUnsetLater: (v: boolean) => void;
}

/* ------------------------------------------------------------------ */
/*                         COMPONENT                                   */
/* ------------------------------------------------------------------ */

/**
 * Grille de disponibilités — 7 jours × 7 créneaux de 2h (6h-20h).
 *
 * Interactions rapides :
 * - Click cellule : toggle individuel
 * - Click en-tête jour/créneau : toggle ligne/colonne entière
 * - Presets cumulables (Soirs en semaine / Weekends / Toute la semaine) :
 *   click ajoute les créneaux du preset, re-click les retire
 * - Bouton "Effacer" séparé à droite : reset complet
 * - Checkbox "renseigner plus tard" : grise toute la grille et permet de
 *   passer l'étape sans rien remplir
 */
export function StepAvailability({
  value,
  onChange,
  unsetLater,
  onChangeUnsetLater,
}: StepAvailabilityProps) {
  const toggleCell = (day: number, slot: number) => {
    const next = new Set(value);
    const key = cellKey(day, slot);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onChange(next);
  };

  const toggleColumn = (day: number) => {
    const next = new Set(value);
    const allFilled = SLOTS.every((_, slot) => next.has(cellKey(day, slot)));
    SLOTS.forEach((_, slot) => {
      const key = cellKey(day, slot);
      if (allFilled) next.delete(key);
      else next.add(key);
    });
    onChange(next);
  };

  const toggleRow = (slot: number) => {
    const next = new Set(value);
    const allFilled = DAYS.every((_, day) => next.has(cellKey(day, slot)));
    DAYS.forEach((_, day) => {
      const key = cellKey(day, slot);
      if (allFilled) next.delete(key);
      else next.add(key);
    });
    onChange(next);
  };

  /* Toggle additif/soustractif : si tous les créneaux du preset sont déjà
   * cochés → on les retire ; sinon → on les ajoute (cumul avec l'existant). */
  const togglePreset = (preset: Preset) => {
    const presetKeys = preset.keys();
    const next = new Set(value);
    const allIn = [...presetKeys].every((k) => next.has(k));
    presetKeys.forEach((k) => {
      if (allIn) next.delete(k);
      else next.add(k);
    });
    onChange(next);
  };

  const isPresetActive = (preset: Preset) => {
    const presetKeys = preset.keys();
    return [...presetKeys].every((k) => value.has(k));
  };

  const clearAll = () => onChange(new Set());

  const selectedCount = value.size;
  const disabled = unsetLater;

  return (
    <div className="flex flex-col gap-5">
      {/* Presets + Effacer — tous sur la même ligne, Effacer en style ghost */}
      <div className={cn('transition-opacity', disabled && 'pointer-events-none opacity-50')}>
        <p className="text-mid mb-2 text-[0.72rem] font-medium uppercase tracking-[0.06em]">
          Sélection rapide
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((preset) => {
            const active = isPresetActive(preset);
            const Icon = preset.icon;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => togglePreset(preset)}
                aria-pressed={active}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.76rem] font-medium transition-colors',
                  active
                    ? 'border-terra bg-terra/10 text-terra'
                    : 'border-bd text-mid hover:border-terra hover:text-terra bg-white',
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {preset.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={clearAll}
            disabled={disabled || selectedCount === 0}
            className="text-light hover:text-mid inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.76rem] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Eraser className="h-3.5 w-3.5" aria-hidden />
            Effacer
          </button>
        </div>
      </div>

      {/* Grille jours × créneaux */}
      <div
        className={cn(
          'overflow-x-auto transition-opacity',
          disabled && 'pointer-events-none opacity-50',
        )}
      >
        <table className="w-full border-separate border-spacing-1.5">
          <thead>
            <tr>
              <th className="text-light w-20 px-2 py-1.5 text-left text-[0.66rem] font-medium uppercase tracking-[0.06em]">
                Créneau
              </th>
              {DAYS.map((day, dayIdx) => {
                const allFilled = SLOTS.every((_, slot) => value.has(cellKey(dayIdx, slot)));
                return (
                  <th key={day} className="w-12 sm:w-auto">
                    <button
                      type="button"
                      onClick={() => toggleColumn(dayIdx)}
                      className={cn(
                        'w-full rounded-md px-1 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.06em] transition-colors',
                        allFilled
                          ? 'bg-terra/10 text-terra'
                          : 'text-mid hover:bg-cream hover:text-terra',
                      )}
                      title={`Tout (dé)sélectionner pour ${day}`}
                    >
                      {day}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot, slotIdx) => {
              const allFilled = DAYS.every((_, day) => value.has(cellKey(day, slotIdx)));
              return (
                <tr key={slot.label}>
                  <th scope="row" className="whitespace-nowrap py-1.5 pr-1 text-left">
                    <button
                      type="button"
                      onClick={() => toggleRow(slotIdx)}
                      className={cn(
                        'w-full rounded-md px-2 py-2 text-left text-[0.78rem] font-medium transition-colors',
                        allFilled
                          ? 'bg-terra/10 text-terra'
                          : 'text-mid hover:bg-cream hover:text-terra',
                      )}
                      title={`Tout (dé)sélectionner pour ${slot.label}`}
                    >
                      {slot.label}
                    </button>
                  </th>
                  {DAYS.map((day, dayIdx) => {
                    const isOn = value.has(cellKey(dayIdx, slotIdx));
                    return (
                      <td key={day} className="p-0">
                        <button
                          type="button"
                          onClick={() => toggleCell(dayIdx, slotIdx)}
                          aria-pressed={isOn}
                          aria-label={`${day} ${slot.label}`}
                          className={cn(
                            'h-10 w-full rounded-md border text-[0.74rem] transition-all sm:h-11',
                            isOn
                              ? 'border-terra bg-terra shadow-soft text-white'
                              : 'border-bd text-light hover:border-terra-light hover:text-terra bg-white',
                          )}
                        >
                          {isOn ? '✓' : ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Compteur */}
      <p className="text-mid text-[0.78rem]">
        {disabled ? (
          <span className="text-light italic">
            Vous compléterez vos disponibilités plus tard depuis votre espace.
          </span>
        ) : selectedCount === 0 ? (
          <span className="text-light">Aucun créneau sélectionné</span>
        ) : (
          <>
            <strong className="text-terra">{selectedCount}</strong>{' '}
            {selectedCount > 1 ? 'créneaux sélectionnés' : 'créneau sélectionné'}
            {', '}
            <span className="text-light">soit {selectedCount * 2}h par semaine</span>
          </>
        )}
      </p>

      {/* Bypass card — "Je remplirai plus tard". Placée en bas comme
          échappatoire : on encourage d'abord à essayer la grille, et la
          checkbox est une porte de sortie pour qui ne peut pas encore. */}
      <label
        className={cn(
          'flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors',
          unsetLater
            ? 'border-terra/40 bg-terra/[0.08]'
            : 'border-bd-light bg-warm hover:border-terra/30',
        )}
      >
        <input
          type="checkbox"
          checked={unsetLater}
          onChange={(e) => onChangeUnsetLater(e.target.checked)}
          className="accent-terra mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
        />
        <span className="text-deep text-[0.84rem] font-medium leading-[1.6]">
          Mon planning n’est pas encore fixé, je le compléterai plus tard.
        </span>
      </label>
    </div>
  );
}
