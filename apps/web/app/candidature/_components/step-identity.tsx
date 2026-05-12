'use client';

import * as React from 'react';

export interface IdentityData {
  prenom: string;
  nom: string;
  dateNaissance: string;
  telephone: string;
  formation: string;
  etablissement: string;
  annee: string;
}

export const emptyIdentity: IdentityData = {
  prenom: '',
  nom: '',
  dateNaissance: '',
  telephone: '',
  formation: '',
  etablissement: '',
  annee: '',
};

interface StepIdentityProps {
  data: IdentityData;
  onChange: (data: IdentityData) => void;
}

/* Liste de formations, calquée sur le HTML fourni. */
const formationGroups = [
  {
    label: 'Santé et paramédical',
    options: [
      'Infirmier(ère) — IFSI',
      'Aide-soignant(e) — IFAS',
      'Médecine',
      'Pharmacie',
      'Kiné / Ergothérapeute / Orthophoniste',
      'Sage-femme',
    ],
  },
  {
    label: 'Social et humain',
    options: [
      'Travail social (DEASS, DEES, DECESF...)',
      'Psychologie',
      'Éducation spécialisée',
    ],
  },
  { label: 'Sport', options: ['STAPS'] },
  {
    label: 'Autre',
    options: ['Autre formation universitaire', 'Autre formation en alternance'],
  },
];

const annees = [
  '1ère année',
  '2ème année',
  '3ème année',
  '4ème année',
  '5ème année ou plus',
];

export function StepIdentity({ data, onChange }: StepIdentityProps) {
  const set = <K extends keyof IdentityData>(key: K, value: IdentityData[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Prénom *">
          <input
            type="text"
            value={data.prenom}
            onChange={(e) => set('prenom', e.target.value)}
            placeholder="Votre prénom"
            className={inputClasses}
          />
        </Field>
        <Field label="Nom *">
          <input
            type="text"
            value={data.nom}
            onChange={(e) => set('nom', e.target.value)}
            placeholder="Votre nom"
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date de naissance">
          <input
            type="date"
            value={data.dateNaissance}
            onChange={(e) => set('dateNaissance', e.target.value)}
            className={inputClasses}
          />
        </Field>
        <Field label="Téléphone">
          <input
            type="tel"
            value={data.telephone}
            onChange={(e) => set('telephone', e.target.value)}
            placeholder="06 xx xx xx xx"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="Formation suivie ou diplôme en cours *">
        <select
          value={data.formation}
          onChange={(e) => set('formation', e.target.value)}
          className={inputClasses}
        >
          <option value="">Sélectionner...</option>
          {formationGroups.map((group) => (
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
            value={data.etablissement}
            onChange={(e) => set('etablissement', e.target.value)}
            placeholder="École ou université"
            className={inputClasses}
          />
        </Field>
        <Field label="Année d’étude">
          <select
            value={data.annee}
            onChange={(e) => set('annee', e.target.value)}
            className={inputClasses}
          >
            <option value="">Sélectionner...</option>
            {annees.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </div>
  );
}

const inputClasses =
  'w-full rounded-md border border-bd bg-white px-3.5 py-2.5 text-[0.9rem] text-deep transition-colors placeholder:text-light focus:border-terra focus:outline-none focus:ring-1 focus:ring-terra/30';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.72rem] font-medium uppercase tracking-[0.06em] text-mid">
        {label}
      </span>
      {children}
    </label>
  );
}
