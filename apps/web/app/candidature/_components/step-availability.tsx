'use client';

import { Eraser, Moon, Sparkles, Sun } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*                        DATA / TYPES                                */
/* ------------------------------------------------------------------ */

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;

/* Créneaux de 2 heures entre 7h et 19h. */
const SLOTS = [
  { label: '7h – 9h', short: '7–9' },
  { label: '9h – 11h', short: '9–11' },
  { label: '11h – 13h', short: '11–13' },
  { label: '13h – 15h', short: '13–15' },
  { label: '15h – 17h', short: '15–17' },
  { label: '17h – 19h', short: '17–19' },
] as const;

/** Clé d'une cellule : `${dayIdx}-${slotIdx}` (0..6 × 0..5). */
export type AvailabilityKey = string;

const cellKey = (day: number, slot: number) => `${day}-${slot}`;

/* ------------------------------------------------------------------ */
/*                         PROPS                                       */
/* ------------------------------------------------------------------ */

interface StepAvailabilityProps {
  value: ReadonlySet<AvailabilityKey>;
  onChange: (next: Set<AvailabilityKey>) => void;
}

/* ------------------------------------------------------------------ */
/*                         COMPONENT                                   */
/* ------------------------------------------------------------------ */

/**
 * Grille de disponibilités — 7 jours × 6 créneaux de 2h (7-19h).
 *
 * Interactions rapides :
 * - Click sur cellule : toggle individuel
 * - Click sur en-tête jour : toggle toute la colonne
 * - Click sur en-tête créneau : toggle toute la ligne
 * - Presets : Semaine soirs / Weekends / Toute la semaine / Effacer
 */
export function StepAvailability({ value, onChange }: StepAvailabilityProps) {
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

  /* Presets — remplacent intégralement la sélection. */
  const applyPreset = (preset: 'soirs-semaine' | 'weekends' | 'all' | 'clear') => {
    const next = new Set<AvailabilityKey>();
    if (preset === 'soirs-semaine') {
      [0, 1, 2, 3, 4].forEach((day) => next.add(cellKey(day, 5)));
    } else if (preset === 'weekends') {
      [5, 6].forEach((day) =>
        SLOTS.forEach((_, slot) => next.add(cellKey(day, slot))),
      );
    } else if (preset === 'all') {
      DAYS.forEach((_, day) =>
        SLOTS.forEach((_, slot) => next.add(cellKey(day, slot))),
      );
    }
    onChange(next);
  };

  const selectedCount = value.size;

  return (
    <div className="flex flex-col gap-5">
      {/* Presets rapides */}
      <div>
        <p className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.06em] text-mid">
          Sélection rapide
        </p>
        <div className="flex flex-wrap gap-2">
          <PresetButton icon={Moon} onClick={() => applyPreset('soirs-semaine')}>
            Soirs en semaine
          </PresetButton>
          <PresetButton icon={Sun} onClick={() => applyPreset('weekends')}>
            Weekends
          </PresetButton>
          <PresetButton icon={Sparkles} onClick={() => applyPreset('all')}>
            Toute la semaine
          </PresetButton>
          <PresetButton icon={Eraser} onClick={() => applyPreset('clear')}>
            Effacer
          </PresetButton>
        </div>
      </div>

      {/* Grille jours × créneaux */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1.5">
          <thead>
            <tr>
              <th className="w-20 px-2 py-1.5 text-left text-[0.66rem] font-medium uppercase tracking-[0.06em] text-light">
                Créneau
              </th>
              {DAYS.map((day, dayIdx) => {
                const allFilled = SLOTS.every((_, slot) =>
                  value.has(cellKey(dayIdx, slot)),
                );
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
              const allFilled = DAYS.every((_, day) =>
                value.has(cellKey(day, slotIdx)),
              );
              return (
                <tr key={slot.label}>
                  <th
                    scope="row"
                    className="whitespace-nowrap py-1.5 pr-1 text-left"
                  >
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
                              ? 'border-terra bg-terra text-white shadow-soft'
                              : 'border-bd bg-white text-light hover:border-terra-light hover:text-terra',
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
      <p className="text-[0.78rem] text-mid">
        {selectedCount === 0 ? (
          <span className="text-light">Aucun créneau sélectionné</span>
        ) : (
          <>
            <strong className="text-terra">{selectedCount}</strong>{' '}
            {selectedCount > 1 ? 'créneaux sélectionnés' : 'créneau sélectionné'}
            {' — '}
            <span className="text-light">
              soit {selectedCount * 2}h par semaine
            </span>
          </>
        )}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                          SUB                                        */
/* ------------------------------------------------------------------ */

function PresetButton({
  icon: Icon,
  onClick,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-bd bg-white px-3 py-1.5 text-[0.76rem] font-medium text-mid transition-colors hover:border-terra hover:text-terra"
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {children}
    </button>
  );
}
