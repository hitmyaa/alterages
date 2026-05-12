'use client';

import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Stepper } from './_components/stepper';
import {
  StepAvailability,
  type AvailabilityKey,
} from './_components/step-availability';
import {
  StepIdentity,
  type IdentityData,
  emptyIdentity,
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
  const [availability, setAvailability] = React.useState<Set<AvailabilityKey>>(
    () => new Set(),
  );
  const [zones, setZones] = React.useState<Set<string>>(() => new Set());
  const [transport, setTransport] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const goPrev = () => setStep((s) => Math.max(1, s - 1) as StepId);
  const goNext = () => {
    if (step < 3) setStep((s) => (s + 1) as StepId);
    else setSubmitted(true);
  };

  /* ----------------- Écran de confirmation ----------------- */
  if (submitted) {
    return (
      <div className="container max-w-xl py-16 md:py-24">
        <div className="rounded-2xl border border-bd bg-white p-8 text-center shadow-soft md:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage">
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          </div>
          <h1 className="heading-serif h2">
            Votre <em>préinscription</em> est enregistrée
          </h1>
          <p className="mx-auto mt-4 max-w-md lead">
            Merci {identity.prenom || 'pour votre candidature'} ! Nous avons
            bien reçu votre dossier. Vous recevrez sous peu un e-mail récapitulatif
            avec les prochaines étapes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/etudiants" className="btn-outline">
              Retour à la page étudiants
            </Link>
            <Link href="/" className="btn-primary group">
              Aller à l’accueil
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------- Tunnel ----------------- */

  const isStep1Valid =
    identity.prenom.trim().length > 0 &&
    identity.nom.trim().length > 0 &&
    identity.formation.trim().length > 0;
  const isStep3Valid = zones.size > 0;

  const canGoNext =
    (step === 1 && isStep1Valid) || step === 2 || (step === 3 && isStep3Valid);

  return (
    <div className="container max-w-3xl py-10 md:py-16">
      <div className="rounded-2xl border border-bd bg-white p-6 shadow-soft md:p-10">
        {/* Tag + intro */}
        <span className="eyebrow">Préinscription AlterAges</span>
        <h1 className="heading-serif font-serif text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.15] text-deep">
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
        <p className="mt-2 text-[0.88rem] leading-[1.7] text-mid">
          Trois étapes, moins de 3 minutes. Vous complèterez votre dossier à
          votre rythme depuis votre espace.
        </p>

        {/* Stepper */}
        <div className="mt-8">
          <Stepper steps={STEPS} current={step} />
        </div>

        {/* Step body */}
        <div className="mt-8">
          {step === 1 && (
            <StepIdentity data={identity} onChange={setIdentity} />
          )}
          {step === 2 && (
            <StepAvailability value={availability} onChange={setAvailability} />
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

        {/* Footer nav */}
        <div className="mt-10 flex items-center justify-between border-t border-bd-light pt-6">
          <span className="text-[0.78rem] text-light">
            Étape {step} sur {STEPS.length}
          </span>
          <div className="flex gap-2.5">
            {step > 1 ? (
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex items-center gap-1.5 rounded-sm border border-bd bg-white px-5 py-2.5 text-[0.85rem] text-mid transition-colors hover:border-mid"
              >
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </button>
            ) : null}
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className={cn(
                'group inline-flex items-center gap-2 rounded-sm bg-terra px-6 py-2.5 text-[0.85rem] font-medium text-white transition-all hover:bg-terra-dark',
                !canGoNext && 'cursor-not-allowed opacity-50 hover:bg-terra',
              )}
            >
              {step === 3 ? 'Soumettre' : 'Continuer'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
