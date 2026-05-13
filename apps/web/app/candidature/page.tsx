'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { submitQuestionnaire } from './_actions';

import { Stepper } from './_components/stepper';
import { StepAvailability, type AvailabilityKey } from './_components/step-availability';
import {
  StepIdentity,
  type IdentityData,
  emptyIdentity,
  isOver18,
} from './_components/step-identity';
import { StepZones } from './_components/step-zones';

type StepId = 1 | 2 | 3;

const STEPS = [
  { id: 1, label: 'Identité & formation' },
  { id: 2, label: 'Disponibilités' },
  { id: 3, label: 'Zones' },
] as const;

export default function CandidaturePage() {
  const [step, setStep] = React.useState<StepId>(1);
  const [identity, setIdentity] = React.useState<IdentityData>(emptyIdentity);
  const [availability, setAvailability] = React.useState<Set<AvailabilityKey>>(() => new Set());
  const [availabilityLater, setAvailabilityLater] = React.useState(false);
  const [zones, setZones] = React.useState<Set<string>>(() => new Set());
  const [transport, setTransport] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const goPrev = () => setStep((s) => Math.max(1, s - 1) as StepId);

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    const result = await submitQuestionnaire({
      identity,
      availability: Array.from(availability),
      availabilityLater,
      zones: Array.from(zones),
      transport,
    });
    /* En cas de succès, la server action a déjà fait un `redirect()`.
     * On n'arrive ici que si une erreur a été renvoyée. */
    if (result && 'error' in result) {
      setSubmitError(result.error);
      setSubmitting(false);
    }
  };

  const goNext = () => {
    if (step < 3) setStep((s) => (s + 1) as StepId);
    else void submit();
  };

  /* ----------------- Tunnel ----------------- */

  /* Date de naissance facultative — si saisie, elle doit donner ≥ 18 ans. */
  const isStep1Valid =
    identity.prenom.trim().length > 0 &&
    identity.nom.trim().length > 0 &&
    identity.formation.trim().length > 0 &&
    (identity.dateNaissance === '' || isOver18(identity.dateNaissance));
  const isStep3Valid = zones.size > 0;

  const canGoNext = (step === 1 && isStep1Valid) || step === 2 || (step === 3 && isStep3Valid);

  return (
    <div className="container max-w-3xl py-10 md:py-16">
      <div className="border-bd shadow-soft rounded-2xl border bg-white p-6 md:p-10">
        {/* Stepper en tête — pattern checkout : on situe l'utilisateur dans
            le parcours global avant d'introduire le contenu de l'étape. */}
        <div className="border-bd-light border-b pb-7">
          <Stepper steps={STEPS} current={step} />
        </div>

        {/* Tag + intro */}
        <span className="eyebrow mt-7 block">Préinscription AlterAges</span>
        <h1 className="heading-serif text-deep font-serif text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.15]">
          {step === 1 && (
            <>
              Vos informations <em>personnelles</em>
            </>
          )}
          {step === 2 && (
            <>
              Vos <em>disponibilités</em>
            </>
          )}
          {step === 3 && (
            <>
              Vos zones d’<em>intervention</em>
            </>
          )}
        </h1>
        <p className="text-mid mt-2 text-[0.88rem] leading-[1.7]">
          {step === 1 &&
            'Quelques informations pour faire connaissance. Seuls votre prénom, nom et formation sont obligatoires.'}
          {step === 2 &&
            'Indiquez les créneaux où vous êtes habituellement disponible. Tout est ajustable à tout moment depuis votre espace.'}
          {step === 3 &&
            'Choisissez les arrondissements et communes où vous pouvez intervenir. Au moins une zone est nécessaire.'}
        </p>

        {/* Step body */}
        <div className="mt-8">
          {step === 1 && <StepIdentity data={identity} onChange={setIdentity} />}
          {step === 2 && (
            <StepAvailability
              value={availability}
              onChange={setAvailability}
              unsetLater={availabilityLater}
              onChangeUnsetLater={setAvailabilityLater}
            />
          )}
          {step === 3 && (
            <StepZones
              selected={zones}
              onChangeSelected={setZones}
              transport={transport}
              onChangeTransport={setTransport}
            />
          )}
        </div>

        {/* Erreur soumission */}
        {submitError ? (
          <p
            role="alert"
            className="border-destructive/30 bg-destructive/10 text-destructive mt-6 rounded-md border px-4 py-2.5 text-[0.82rem]"
          >
            {submitError}
          </p>
        ) : null}

        {/* Footer nav */}
        <div className="border-bd-light mt-10 flex items-center justify-between border-t pt-6">
          <span className="text-light text-[0.78rem]">
            Étape {step} sur {STEPS.length}
          </span>
          <div className="flex gap-2.5">
            {step > 1 ? (
              <button
                type="button"
                onClick={goPrev}
                className="border-bd text-mid hover:border-mid inline-flex items-center gap-1.5 rounded-sm border bg-white px-5 py-2.5 text-[0.85rem] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </button>
            ) : null}
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext || submitting}
              className={cn(
                'bg-terra hover:bg-terra-dark group inline-flex items-center gap-2 rounded-sm px-6 py-2.5 text-[0.85rem] font-medium text-white transition-all',
                (!canGoNext || submitting) && 'hover:bg-terra cursor-not-allowed opacity-50',
              )}
            >
              {submitting ? 'Envoi…' : step === 3 ? 'Soumettre' : 'Continuer'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
