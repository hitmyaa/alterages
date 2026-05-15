'use client';

import * as React from 'react';

import { isOver18 } from '@/app/candidature/_components/step-identity';

import { updateIdentity } from '../_actions';

import { Field, Row, SectionCard } from './section-card';

export interface IdentityInitial {
  prenom: string;
  nom: string;
  dateNaissance: string;
  telephone: string;
  email: string | undefined;
}

export function IdentitySection({ initial }: { initial: IdentityInitial }) {
  const [prenom, setPrenom] = React.useState(initial.prenom);
  const [nom, setNom] = React.useState(initial.nom);
  const [dateNaissance, setDateNaissance] = React.useState(initial.dateNaissance);
  const [telephone, setTelephone] = React.useState(initial.telephone);

  const maxBirthDate = React.useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split('T')[0];
  }, []);

  const ageError = dateNaissance.length > 0 && !isOver18(dateNaissance);
  const canSave = prenom.trim().length > 0 && nom.trim().length > 0 && !ageError;

  const reset = () => {
    setPrenom(initial.prenom);
    setNom(initial.nom);
    setDateNaissance(initial.dateNaissance);
    setTelephone(initial.telephone);
  };

  return (
    <SectionCard
      title="Identité"
      canSave={canSave}
      onEnterEdit={reset}
      onSave={() => updateIdentity({ prenom, nom, dateNaissance, telephone })}
      renderEditor={() => (
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Prénom *">
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Votre prénom"
                className="field-input"
              />
            </Field>
            <Field label="Nom *">
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Votre nom"
                className="field-input"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Date de naissance"
              error={ageError ? 'Vous devez avoir au moins 18 ans.' : undefined}
            >
              <input
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                max={maxBirthDate}
                aria-invalid={ageError}
                className={`field-input ${ageError ? 'field-invalid' : ''}`}
              />
            </Field>
            <Field label="Téléphone">
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="06 xx xx xx xx"
                className="field-input"
              />
            </Field>
          </div>

          <Field label="E-mail (non modifiable)">
            <input
              type="email"
              value={initial.email ?? ''}
              disabled
              className="field-input bg-cream text-light cursor-not-allowed"
            />
          </Field>
        </div>
      )}
    >
      <Row label="Prénom" value={initial.prenom} />
      <Row label="Nom" value={initial.nom} />
      <Row label="Date de naissance" value={formatDate(initial.dateNaissance)} />
      <Row label="Téléphone" value={initial.telephone} />
      <Row label="E-mail" value={initial.email} />
    </SectionCard>
  );
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
