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

/**
 * Renvoie `true` si la date ISO (YYYY-MM-DD) correspond à une personne
 * d'au moins 18 ans à la date d'aujourd'hui. Renvoie `false` si la date
 * est vide ou invalide.
 */
export function isOver18(dateStr: string): boolean {
  if (!dateStr) return false;
  const birth = new Date(dateStr);
  if (Number.isNaN(birth.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age >= 18;
}

interface StepIdentityProps {
  data: IdentityData;
  onChange: (data: IdentityData) => void;
}

/* Liste de formations, calquée sur le HTML fourni. */
const formationGroups = [
  {
    label: 'Santé et paramédical',
    options: [
      'Infirmier(ère), IFSI',
      'Aide-soignant(e), IFAS',
      'Médecine',
      'Pharmacie',
      'Kiné / Ergothérapeute / Orthophoniste',
      'Sage-femme',
    ],
  },
  {
    label: 'Social et humain',
    options: ['Travail social (DEASS, DEES, DECESF...)', 'Psychologie', 'Éducation spécialisée'],
  },
  { label: 'Sport', options: ['STAPS'] },
  {
    label: 'Autre',
    options: ['Autre formation universitaire', 'Autre formation en alternance'],
  },
];

const annees = ['1ère année', '2ème année', '3ème année', '4ème année', '5ème année ou plus'];

export function StepIdentity({ data, onChange }: StepIdentityProps) {
  const set = <K extends keyof IdentityData>(key: K, value: IdentityData[K]) => {
    onChange({ ...data, [key]: value });
  };

  /* Date max = aujourd'hui − 18 ans (clamp natif via attribut HTML). */
  const maxBirthDate = React.useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split('T')[0];
  }, []);

  /* Erreur uniquement si une date a été saisie mais ne donne pas 18 ans. */
  const showAgeError = data.dateNaissance.length > 0 && !isOver18(data.dateNaissance);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Prénom *">
          <input
            type="text"
            value={data.prenom}
            onChange={(e) => set('prenom', e.target.value)}
            placeholder="Votre prénom"
            className="field-input"
          />
        </Field>
        <Field label="Nom *">
          <input
            type="text"
            value={data.nom}
            onChange={(e) => set('nom', e.target.value)}
            placeholder="Votre nom"
            className="field-input"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Date de naissance"
          error={showAgeError ? 'Vous devez avoir au moins 18 ans pour candidater.' : undefined}
        >
          <input
            type="date"
            value={data.dateNaissance}
            onChange={(e) => set('dateNaissance', e.target.value)}
            max={maxBirthDate}
            aria-invalid={showAgeError}
            className={`field-input ${showAgeError ? 'field-invalid' : ''}`}
          />
        </Field>
        <Field label="Téléphone">
          <input
            type="tel"
            value={data.telephone}
            onChange={(e) => set('telephone', e.target.value)}
            placeholder="06 xx xx xx xx"
            className="field-input"
          />
        </Field>
      </div>

      <Field label="Formation suivie ou diplôme en cours *">
        <select
          value={data.formation}
          onChange={(e) => set('formation', e.target.value)}
          className="field-select"
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
            className="field-input"
          />
        </Field>
        <Field label="Année d’étude">
          <select
            value={data.annee}
            onChange={(e) => set('annee', e.target.value)}
            className="field-select"
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

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-mid text-[0.72rem] font-medium uppercase tracking-[0.06em]">
        {label}
      </span>
      {children}
      {error ? <span className="text-destructive text-[0.74rem]">{error}</span> : null}
    </label>
  );
}
