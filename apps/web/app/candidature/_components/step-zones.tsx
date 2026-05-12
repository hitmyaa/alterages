'use client';

import { Check, MapPin } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*                       DATA — zones                                  */
/* ------------------------------------------------------------------ */

interface Zone {
  id: string;
  label: string;
  /** Position approximative sur la carte (en % de la box parent). */
  top: number;
  left: number;
  width: number;
  height: number;
}

/* Carte schématique : grille géographique approximée de Lyon + agglo.
 * Lyon 1–9 + communes limitrophes (Caluire au N, Villeurbanne, Bron à l'E,
 * Vénissieux, Saint-Fons au S, Décines à l'E lointain). */
const ZONES: ReadonlyArray<Zone> = [
  { id: 'caluire', label: 'Caluire', top: 3, left: 30, width: 18, height: 10 },
  { id: 'lyon-9', label: 'Lyon 9', top: 13, left: 8, width: 20, height: 18 },
  { id: 'lyon-4', label: 'Lyon 4', top: 15, left: 30, width: 18, height: 14 },
  { id: 'lyon-6', label: 'Lyon 6', top: 13, left: 50, width: 18, height: 16 },
  { id: 'decines', label: 'Décines', top: 13, left: 72, width: 18, height: 30 },
  { id: 'lyon-1', label: 'Lyon 1', top: 31, left: 30, width: 18, height: 11 },
  { id: 'lyon-5', label: 'Lyon 5', top: 33, left: 8, width: 20, height: 22 },
  { id: 'villeurbanne', label: 'Villeurbanne', top: 31, left: 50, width: 20, height: 17 },
  { id: 'lyon-2', label: 'Lyon 2', top: 44, left: 30, width: 18, height: 14 },
  { id: 'lyon-3', label: 'Lyon 3', top: 50, left: 50, width: 18, height: 14 },
  { id: 'bron', label: 'Bron', top: 45, left: 72, width: 18, height: 17 },
  { id: 'lyon-7', label: 'Lyon 7', top: 60, left: 30, width: 18, height: 14 },
  { id: 'lyon-8', label: 'Lyon 8', top: 66, left: 50, width: 18, height: 14 },
  { id: 'venissieux', label: 'Vénissieux', top: 66, left: 72, width: 18, height: 14 },
  { id: 'saint-fons', label: 'Saint-Fons', top: 82, left: 40, width: 22, height: 11 },
];

const TRANSPORT_OPTIONS = [
  'Transports en commun',
  'Vélo / trottinette',
  'Voiture personnelle',
  'Plusieurs modes',
] as const;

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

/**
 * Sélection des zones d'intervention — carte schématique cliquable de Lyon
 * et de son agglomération. Multi-sélection. Liste de zones sélectionnées
 * affichée en récap sous la carte.
 */
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

  const selectedZones = ZONES.filter((z) => selected.has(z.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-2.5 rounded-lg border border-terra/30 bg-terra/[0.06] px-4 py-3 text-[0.82rem] leading-[1.6] text-terra-dark">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <span>
          <strong className="font-medium">Sélectionnez au moins une zone</strong>{' '}
          — vous pourrez la modifier à tout moment depuis votre espace.
        </span>
      </div>

      {/* Carte schématique */}
      <div className="relative aspect-[10/9] w-full overflow-hidden rounded-xl border border-bd bg-cream">
        {/* Rivières en SVG background */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 900"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* Saône — courbe verticale gauche-centre */}
          <path
            d="M 295 0 Q 275 250 290 470 Q 305 690 295 900"
            stroke="#96B89B"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
          {/* Rhône — courbe verticale centre-droite */}
          <path
            d="M 495 0 Q 480 280 495 500 Q 510 720 495 900"
            stroke="#96B89B"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </svg>

        {/* Zones cliquables */}
        {ZONES.map((zone) => {
          const isOn = selected.has(zone.id);
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => toggle(zone.id)}
              aria-pressed={isOn}
              style={{
                top: `${zone.top}%`,
                left: `${zone.left}%`,
                width: `${zone.width}%`,
                height: `${zone.height}%`,
              }}
              className={cn(
                'group absolute flex flex-col items-center justify-center rounded-md border text-[0.7rem] font-medium transition-all',
                isOn
                  ? 'border-terra bg-terra/90 text-white shadow-soft hover:bg-terra'
                  : 'border-bd bg-white/85 text-mid hover:border-terra hover:bg-white hover:text-terra',
              )}
            >
              <span className="px-1 text-center leading-tight">{zone.label}</span>
              {isOn ? (
                <Check className="mt-0.5 h-3 w-3" aria-hidden />
              ) : null}
            </button>
          );
        })}

        {/* Légende coin haut-droit */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-white/90 px-2 py-1 text-[0.66rem] text-light backdrop-blur-sm">
          <span className="inline-block h-2 w-3 rounded-sm bg-sage-light/50" />
          Saône & Rhône
        </div>
      </div>

      {/* Récap sélection */}
      <div>
        <p className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.06em] text-mid">
          {selectedZones.length === 0
            ? 'Aucune zone sélectionnée'
            : `${selectedZones.length} ${selectedZones.length > 1 ? 'zones sélectionnées' : 'zone sélectionnée'}`}
        </p>
        {selectedZones.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {selectedZones.map((z) => (
              <span
                key={z.id}
                className="inline-flex items-center gap-1 rounded-full bg-terra/10 px-2.5 py-0.5 text-[0.74rem] text-terra"
              >
                {z.label}
                <button
                  type="button"
                  onClick={() => toggle(z.id)}
                  aria-label={`Retirer ${z.label}`}
                  className="ml-0.5 text-terra/60 transition-colors hover:text-terra"
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
        <span className="text-[0.72rem] font-medium uppercase tracking-[0.06em] text-mid">
          Mode de déplacement
        </span>
        <select
          value={transport}
          onChange={(e) => onChangeTransport(e.target.value)}
          className="w-full rounded-md border border-bd bg-white px-3.5 py-2.5 text-[0.9rem] text-deep transition-colors focus:border-terra focus:outline-none focus:ring-1 focus:ring-terra/30"
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
