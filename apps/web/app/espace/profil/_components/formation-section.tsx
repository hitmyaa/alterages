'use client';

import * as React from 'react';

import { ANNEES_OPTIONS, FORMATION_GROUPS } from '@/lib/student-options';

import { updateFormation } from '../_actions';

import { Field, Row, SectionCard } from './section-card';

export interface FormationInitial {
  formation: string;
  etablissement: string;
  annee: string;
}

export function FormationSection({ initial }: { initial: FormationInitial }) {
  const [formation, setFormation] = React.useState(initial.formation);
  const [etablissement, setEtablissement] = React.useState(initial.etablissement);
  const [annee, setAnnee] = React.useState(initial.annee);

  const canSave = formation.length > 0;

  const reset = () => {
    setFormation(initial.formation);
    setEtablissement(initial.etablissement);
    setAnnee(initial.annee);
  };

  return (
    <SectionCard
      title="Formation"
      canSave={canSave}
      onEnterEdit={reset}
      onSave={() => updateFormation({ formation, etablissement, annee })}
      renderEditor={() => (
        <div className="flex flex-col gap-5">
          <Field label="Formation suivie ou diplôme en cours *">
            <select
              value={formation}
              onChange={(e) => setFormation(e.target.value)}
              className="field-select"
            >
              <option value="">Sélectionner...</option>
              {FORMATION_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Établissement">
              <input
                type="text"
                value={etablissement}
                onChange={(e) => setEtablissement(e.target.value)}
                placeholder="École ou université"
                className="field-input"
              />
            </Field>
            <Field label="Année d’étude">
              <select
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
                className="field-select"
              >
                <option value="">Sélectionner...</option>
                {ANNEES_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      )}
    >
      <Row label="Diplôme / cursus" value={initial.formation} />
      <Row label="Établissement" value={initial.etablissement} />
      <Row label="Année d’étude" value={initial.annee} />
    </SectionCard>
  );
}
