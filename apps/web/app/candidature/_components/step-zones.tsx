'use client';

import { MapPin } from 'lucide-react';
import * as React from 'react';

import {
  ALL_ZONES,
  ARRONDISSEMENTS,
  COMMUNES,
  TRANSPORT_OPTIONS,
  type Zone,
} from '@/lib/student-options';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*                         PROPS                                       */
/* ------------------------------------------------------------------ */

interface StepZonesProps {
  selected: ReadonlySet<string>;
  onChangeSelected: (next: Set<string>) => void;
  transport: string;
  onChangeTransport: (value: string) => void;
}

/* ------------------------------------------------------------------ */
/*                         COMPONENT                                   */
/* ------------------------------------------------------------------ */

export function StepZones({
  selected,
  onChangeSelected,
  transport,
  onChangeTransport,
}: StepZonesProps) {
  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChangeSelected(next);
  };

  const selectedZones = ALL_ZONES.filter((z) => selected.has(z.id));

  return (
    <div className="flex flex-col gap-6">
      {selected.size === 0 ? (
        <div className="border-terra/30 bg-terra/[0.06] text-terra-dark flex items-start gap-2.5 rounded-lg border px-4 py-3 text-[0.82rem] leading-[1.6]">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            <strong className="font-medium">Sélectionnez au moins une zone.</strong> Vous pourrez la
            modifier à tout moment depuis votre espace.
          </span>
        </div>
      ) : null}

      {/* Arrondissements de Lyon */}
      <ZoneGroup
        title="Arrondissements de Lyon"
        zones={ARRONDISSEMENTS}
        selected={selected}
        onToggle={toggle}
      />

      {/* Communes limitrophes */}
      <ZoneGroup
        title="Communes limitrophes"
        zones={COMMUNES}
        selected={selected}
        onToggle={toggle}
      />

      {/* Récap sélection */}
      <div className="border-bd-light border-t pt-5">
        <p className="text-mid mb-2 text-[0.72rem] font-medium uppercase tracking-[0.06em]">
          {selectedZones.length === 0
            ? 'Aucune zone sélectionnée'
            : `${selectedZones.length} ${selectedZones.length > 1 ? 'zones sélectionnées' : 'zone sélectionnée'}`}
        </p>
        {selectedZones.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {selectedZones.map((z) => (
              <span
                key={z.id}
                className="bg-terra/10 text-terra inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.74rem]"
              >
                {z.label}
                <button
                  type="button"
                  onClick={() => toggle(z.id)}
                  aria-label={`Retirer ${z.label}`}
                  className="text-terra/60 hover:text-terra ml-0.5 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Mode de déplacement */}
      <label className="flex flex-col gap-2">
        <span className="text-mid text-[0.72rem] font-medium uppercase tracking-[0.06em]">
          Mode de déplacement
        </span>
        <select
          value={transport}
          onChange={(e) => onChangeTransport(e.target.value)}
          className="field-select"
        >
          <option value="">Sélectionner...</option>
          {TRANSPORT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                          SUB                                        */
/* ------------------------------------------------------------------ */

function ZoneGroup({
  title,
  zones,
  selected,
  onToggle,
}: {
  title: string;
  zones: ReadonlyArray<Zone>;
  selected: ReadonlySet<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-mid mb-2 text-[0.72rem] font-medium uppercase tracking-[0.06em]">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {zones.map((zone) => {
          const isOn = selected.has(zone.id);
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onToggle(zone.id)}
              aria-pressed={isOn}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors',
                isOn
                  ? 'border-terra bg-terra/10 text-terra'
                  : 'border-bd text-mid hover:border-terra-light hover:text-terra bg-white',
              )}
            >
              {zone.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
