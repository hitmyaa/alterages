'use client';

import * as React from 'react';

import {
  type AvailabilityKey,
  StepAvailability,
} from '@/app/candidature/_components/step-availability';
import { DAYS, SLOTS } from '@/lib/student-options';

import { updateAvailability } from '../_actions';

import { SectionCard } from './section-card';

export interface AvailabilityInitial {
  later: boolean;
  slots: ReadonlyArray<{ day_idx: number; slot_idx: number }>;
}

export function AvailabilitySection({ initial }: { initial: AvailabilityInitial }) {
  const buildInitialSet = React.useCallback(
    () => new Set<AvailabilityKey>(initial.slots.map((s) => `${s.day_idx}-${s.slot_idx}`)),
    [initial.slots],
  );

  const [selected, setSelected] = React.useState<Set<AvailabilityKey>>(buildInitialSet);
  const [later, setLater] = React.useState(initial.later);

  const reset = () => {
    setSelected(buildInitialSet());
    setLater(initial.later);
  };

  return (
    <SectionCard
      title="Disponibilités"
      onEnterEdit={reset}
      onSave={() => updateAvailability({ slots: [...selected], later })}
      renderEditor={() => (
        <StepAvailability
          value={selected}
          onChange={setSelected}
          unsetLater={later}
          onChangeUnsetLater={setLater}
        />
      )}
    >
      <AvailabilityView initial={initial} />
    </SectionCard>
  );
}

function AvailabilityView({ initial }: { initial: AvailabilityInitial }) {
  if (initial.later) {
    return (
      <p className="text-light text-[0.85rem] italic">
        Vous compléterez vos disponibilités plus tard.
      </p>
    );
  }
  if (initial.slots.length === 0) {
    return <p className="text-light text-[0.85rem] italic">Aucun créneau renseigné.</p>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {initial.slots
        .slice()
        .sort((a, b) => (a.day_idx === b.day_idx ? a.slot_idx - b.slot_idx : a.day_idx - b.day_idx))
        .map((slot) => (
          <span
            key={`${slot.day_idx}-${slot.slot_idx}`}
            className="bg-terra/10 text-terra inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.74rem]"
          >
            {DAYS[slot.day_idx]} · {SLOTS[slot.slot_idx]?.label}
          </span>
        ))}
    </div>
  );
}
