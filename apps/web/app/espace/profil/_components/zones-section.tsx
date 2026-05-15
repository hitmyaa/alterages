'use client';

import * as React from 'react';

import { StepZones } from '@/app/candidature/_components/step-zones';
import { ZONE_LABEL_BY_ID } from '@/lib/student-options';

import { updateZones } from '../_actions';

import { Row, SectionCard } from './section-card';

export interface ZonesInitial {
  transport: string;
  zoneIds: ReadonlyArray<string>;
}

export function ZonesSection({ initial }: { initial: ZonesInitial }) {
  const [zoneIds, setZoneIds] = React.useState<Set<string>>(() => new Set(initial.zoneIds));
  const [transport, setTransport] = React.useState(initial.transport);

  const reset = () => {
    setZoneIds(new Set(initial.zoneIds));
    setTransport(initial.transport);
  };

  return (
    <SectionCard
      title="Zones d'intervention"
      onEnterEdit={reset}
      onSave={() => updateZones({ zoneIds: [...zoneIds], transport })}
      renderEditor={() => (
        <StepZones
          selected={zoneIds}
          onChangeSelected={setZoneIds}
          transport={transport}
          onChangeTransport={setTransport}
        />
      )}
    >
      <div className="mb-3">
        <Row label="Mode de déplacement" value={initial.transport} />
      </div>
      {initial.zoneIds.length === 0 ? (
        <p className="text-light text-[0.85rem] italic">Aucune zone sélectionnée.</p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {initial.zoneIds.map((id) => (
            <span
              key={id}
              className="bg-terra/10 text-terra inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.74rem]"
            >
              {ZONE_LABEL_BY_ID[id] ?? id}
            </span>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
