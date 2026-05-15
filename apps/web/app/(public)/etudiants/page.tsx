import type { Metadata } from 'next';
import {
  CalendarCheck2,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  PenLine,
  Phone,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';

import { InterestButton } from '@/components/auth/interest-button';
import {
  AdvantageItem,
  ChecklistItem,
  FormationModule,
  Halo,
  MissionCard,
  Section,
  SectionHeader,
  StepsTimeline,
} from '@/components/blocks';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Rejoindre AlterAges · Étudiants',
  description:
    'Un travail étudiant flexible, rémunérateur et impactant — auprès de seniors lyonnais, à votre rythme, dans les quartiers de votre choix.',
};

/* ------------------------------------------------------------------ */
/*                         CONTENU STATIQUE                            */
/* ------------------------------------------------------------------ */

const advantages = [
  {
    value: (
      <>
        <span className="align-middle text-base font-light">~</span>15€
      </>
    ),
    title: 'Rémunération au-dessus du marché',
    description: 'Déclaré via le CESU. Cotisations sociales incluses.',
  },
  {
    value: '100%',
    title: 'Flexibilité totale',
    description: 'Vos horaires, vos zones, vos rythmes.',
  },
  {
    value: '1h',
    title: 'Formation certifiée',
    description: 'Attestation valorisable sur un CV ou dossier de stage.',
  },
  {
    value: '1:1',
    title: 'Un vrai lien humain',
    description: 'Le même bénéficiaire, régulièrement. Une relation qui dure.',
  },
  {
    value: '3 mois',
    title: 'Recommandation professionnelle',
    description: 'Une référence valorisable pour votre dossier, après 3 mois d’engagement.',
  },
];

const missions = [
  {
    title: 'Entretien du domicile',
    description:
      'Ménage courant et rangement. Vous aidez le bénéficiaire à maintenir un cadre de vie propre et agréable, selon ses habitudes et ses préférences.',
  },
  {
    title: 'Compagnie et lien social',
    description:
      "Présence, conversation, activités de loisir, accompagnement aux sorties. L'isolement est le premier ennemi des personnes âgées — votre présence compte plus que vous ne le pensez.",
  },
  {
    title: 'Préparation des repas',
    description:
      'Préparation de repas simples selon les goûts et régimes du bénéficiaire. Aide à la prise des repas si nécessaire. Un moment de partage autant qu’une aide concrète.',
  },
  {
    title: 'Accompagnement numérique',
    description:
      "Aide à l'utilisation du smartphone, de la tablette et des services en ligne. Vidéo avec les proches, démarches administratives, photos : des besoins simples mais essentiels.",
  },
  {
    title: 'Aide à la toilette partielle',
    description:
      "Aide au lavage du visage et des mains, à l'habillage et à l'hygiène courante. Toujours avec le consentement du bénéficiaire, dans le respect total de sa dignité.",
    warning:
      'Formation obligatoire avant cette mission. Gestes spécifiques abordés dans le module 2.',
  },
  {
    title: 'Aide à la mobilité extérieure',
    description:
      "Accompagnement pour les sorties, les courses, les rendez-vous médicaux. Vous permettez à des personnes qui ne sortent parfois plus seules de garder un lien avec l'extérieur.",
  },
];

const formationModules = [
  {
    badge: 'Module 1',
    title: 'Être présent autrement',
    description:
      'Comment créer un lien de confiance avec une personne fragile, sans franchir les limites du cadre professionnel.',
    points: [
      'Posture professionnelle et communication bienveillante',
      "Respect de l'espace privé et des habitudes du bénéficiaire",
      "Limites claires de l'intervention",
      "Gestion des situations émotionnelles et de l'attachement",
    ],
  },
  {
    badge: 'Module 2',
    title: 'Intervenir en sécurité',
    description: 'Les gestes adaptés aux personnes âgées, avec ou sans perte de mobilité.',
    points: [
      'Aide à la toilette partielle dans le respect de la dignité',
      'Mobilisation sécurisée : lever, habillage, déplacement',
      'Prévention des chutes et réflexes de sécurité au domicile',
      "Ce qu'on ne fait pas : actes médicaux, nursing lourd, médicaments",
    ],
    note: 'Obligatoire pour les missions de toilette partielle et de mobilité extérieure.',
  },
  {
    badge: 'Module 3',
    title: 'Réagir et alerter',
    description:
      'Savoir quoi faire quand quelque chose ne va pas. Et à qui le dire, dans quel délai, avec quelles informations.',
    points: [
      'Reconnaître les signes de détresse physique ou psychologique',
      'Procédure de signalement AlterAges : qui contacter, comment, quand',
      "Situations d'urgence : appel au 15 ou 18 avant tout",
      'Confidentialité et obligation de discrétion',
    ],
  },
];

const parcours = [
  {
    icon: PenLine,
    title: 'Vous candidatez',
    description:
      'Un questionnaire en ligne. Votre formation, vos disponibilités, vos zones préférées. Pas de CV ni de lettre de motivation.',
    note: 'Rapide',
  },
  {
    icon: ClipboardList,
    title: 'Vous complétez votre dossier',
    description:
      'CV, bulletin de casier judiciaire B3 (gratuit sur casier.justice.fr), photo. Puis la formation en ligne.',
    note: 'À votre rythme',
  },
  {
    icon: Phone,
    title: 'On vous recontacte',
    description: 'Un échange téléphonique court pour se présenter et répondre à vos questions.',
    note: 'Réponse rapide',
  },
  {
    icon: CalendarCheck2,
    title: 'Votre première mission',
    description:
      'Nous vous contactons dès qu’un bénéficiaire correspond à votre profil. Vous démarrez avec toutes les informations utiles.',
    note: 'Selon vos disponibilités',
  },
] as const;

/* ------------------------------------------------------------------ */
/*                      MOCKUP ESPACE ÉTUDIANT                         */
/* ------------------------------------------------------------------ */

function DashboardMockup() {
  const upcoming = [
    { date: 'Mar. 19', time: '14h–17h', name: 'Mme Lefèvre', area: 'Lyon 3', tag: 'Compagnie' },
    { date: 'Jeu. 21', time: '10h–12h', name: 'M. Bouchard', area: 'Villeurbanne', tag: 'Repas' },
    { date: 'Sam. 23', time: '15h–18h', name: 'Mme Diallo', area: 'Lyon 7', tag: 'Numérique' },
  ];

  const months = [
    { label: 'Févr.', height: 38 },
    { label: 'Mars', height: 56 },
    { label: 'Avril', height: 48 },
    { label: 'Mai', height: 82, active: true },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Planning */}
      <article className="ring-bd/60 rounded-xl bg-white p-5 shadow-[0_20px_50px_-25px_rgba(61,48,32,0.25)] ring-1">
        <header className="flex items-center justify-between">
          <span className="eyebrow !mb-0">Planning · mai 2026</span>
          <CalendarCheck2 className="text-terra h-4 w-4" />
        </header>
        <h4 className="heading-serif text-deep mt-3 text-[1rem] leading-tight">
          Vos prochaines missions
        </h4>
        <ul className="divide-bd-light/70 mt-3 divide-y">
          {upcoming.map((m) => (
            <li
              key={m.date}
              className="flex items-center justify-between gap-3 py-2.5 text-[0.78rem]"
            >
              <div className="min-w-0">
                <div className="text-deep font-medium">
                  {m.date} · {m.time}
                </div>
                <div className="text-mid truncate text-[0.72rem]">
                  {m.name} · {m.area}
                </div>
              </div>
              <span className="bg-sage/15 text-sage shrink-0 rounded-full px-2 py-0.5 text-[0.62rem] font-medium">
                {m.tag}
              </span>
            </li>
          ))}
        </ul>
      </article>

      {/* Revenus */}
      <article className="ring-bd/60 rounded-xl bg-white p-5 shadow-[0_20px_50px_-25px_rgba(61,48,32,0.25)] ring-1">
        <header className="flex items-center justify-between">
          <span className="eyebrow !mb-0">Revenus · ce mois-ci</span>
          <Wallet className="text-terra h-4 w-4" />
        </header>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-deep font-sans text-[1.65rem] font-medium leading-none">347€</span>
          <span className="text-mid text-[0.72rem]">net · 23h travaillées</span>
        </div>
        <div className="mt-4 flex h-14 items-end gap-2">
          {months.map((m) => (
            <div
              key={m.label}
              className={`flex-1 rounded-sm ${m.active ? 'bg-terra' : 'bg-terra/25'}`}
              style={{ height: `${m.height}%` }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex gap-2 text-[0.62rem]">
          {months.map((m) => (
            <span
              key={m.label}
              className={`flex-1 text-center ${m.active ? 'text-terra font-medium' : 'text-light'}`}
            >
              {m.label}
            </span>
          ))}
        </div>
      </article>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                              PAGE                                   */
/* ------------------------------------------------------------------ */

export default function EtudiantsPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <Section tone="warm" id="accueil" className="pt-32 md:pt-36">
        <Halo color="terra" position="top-right" />
        <Halo color="sage" position="bottom-left" size="lg" />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="animate-fade-up">
            <h1 className="h-display max-w-3xl">
              Un travail étudiant
              <br />
              <span className="text-terra not-italic">flexible</span>,{' '}
              <span className="text-terra not-italic">rémunérateur</span>
              <br />
              et <span className="text-terra not-italic">impactant</span>.
            </h1>
            <p className="lead mt-6 max-w-md">
              Vous intervenez auprès de seniors lyonnais selon votre emploi du temps, dans les
              quartiers qui vous conviennent.
            </p>

            <div className="mt-10">
              <InterestButton />
            </div>
          </div>

          <div className="animate-fade-up relative hidden lg:flex lg:[animation-delay:120ms]">
            <div className="shadow-hero ring-bd/60 relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl ring-1">
              <Image
                src="/images/image-principale.png"
                alt="Accompagnement intergénérationnel AlterAges — une jeune étudiante et une personne âgée"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- MISSIONS ---------- */}
      <Section tone="deep" id="missions">
        <SectionHeader
          invert
          eyebrow="Les missions"
          title="Ce que vous ferez concrètement"
          description="AlterAges propose différents types de missions auprès des seniors lyonnais. Chaque intervention est concrète, utile et adaptée à la réalité du quotidien d’une personne âgée à domicile."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {missions.map((m) => (
            <MissionCard
              key={m.title}
              title={m.title}
              description={m.description}
              warning={m.warning}
            />
          ))}
        </div>

        <p className="mt-8 pt-2 text-[0.72rem] leading-[1.6] text-white/40">
          * Ce qu’AlterAges ne couvre pas : soins infirmiers, actes médicaux, administration de
          médicaments, nursing lourd. Ces actes relèvent exclusivement de professionnels de santé.
        </p>
      </Section>

      {/* ---------- POURQUOI ---------- */}
      <Section tone="warm" id="pourquoi">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow">Ce que vous y gagnez</span>
            <h2 className="heading-serif h2 max-w-md">Un travail qui s’adapte à vous.</h2>
            <p className="lead mt-6 max-w-md">
              AlterAges s’adapte à votre emploi du temps pour que, le moment venu, vous soyez
              entièrement disponible pour le senior que vous accompagnez.
            </p>

            <div className="mt-8 flex flex-col">
              {advantages.map((a) => (
                <AdvantageItem
                  key={a.title}
                  value={a.value}
                  title={a.title}
                  description={a.description}
                />
              ))}
            </div>

            <div className="mt-8">
              <InterestButton />
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Un espace dédié</span>
            <h3 className="heading-serif h2 max-w-md">
              Votre espace personnel <em>AlterAges</em>
            </h3>
            <p className="lead mt-6 max-w-md">
              Disponibilités, missions à venir, bulletins de salaire, attestations : tout est
              centralisé dans un espace pensé pour les étudiants.
            </p>
            <div className="mt-6">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- FORMATION ---------- */}
      <Section tone="deep" id="formation">
        <SectionHeader
          invert
          eyebrow="La formation interne"
          title="Formé avant votre première mission"
          description="Avant d’intervenir chez un bénéficiaire, vous suivez une formation en ligne à votre rythme. Elle pose un cadre commun, clair et rassurant."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          <Badge variant="on-dark" size="lg">
            100% en ligne
          </Badge>
          <Badge variant="on-dark" size="lg">
            Attestation délivrée
          </Badge>
          <Badge variant="on-dark" size="lg">
            1h total
          </Badge>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {formationModules.map((m) => (
            <FormationModule
              key={m.badge}
              badge={m.badge}
              title={m.title}
              description={m.description}
              points={m.points}
              note={m.note}
              groupName="formation"
            />
          ))}
          <FormationModule
            badge="Validation"
            title="QCM et cas pratiques"
            description="Un QCM et deux cas pratiques pour valider vos acquis."
            points={[
              'QCM sur les 3 modules',
              '2 cas pratiques sur des situations réelles',
              'Score minimum de 80%',
              "Possibilité de repasser en cas d'échec, sans délai",
            ]}
            note="Attestation valorisable sur un CV · valable 1 an · renouvellement automatique."
            highlight
            groupName="formation"
          />
        </div>

        <div className="mt-10 flex justify-center">
          <InterestButton variant="on-dark" label="Rejoindre et accéder à la formation" />
        </div>
      </Section>

      {/* ---------- PARCOURS ---------- */}
      <Section tone="warm" id="parcours">
        <SectionHeader
          eyebrow="De la candidature à la première mission"
          title="La démarche"
          description="Quatre étapes simples. Le tout sans paperasse inutile."
        />

        <div className="mt-12">
          <StepsTimeline steps={parcours} />
        </div>

        <div className="mt-12 flex justify-center">
          <InterestButton label="Commencer la démarche" />
        </div>
      </Section>

      {/* ---------- ENGAGEMENT + FAQ ---------- */}
      <Section tone="cream" grain id="engagement">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow">Ce qu’on attend de vous</span>
            <h2 className="heading-serif h2">Un engagement humain avant tout</h2>
            <p className="lead mt-4 max-w-md">
              AlterAges ne cherche pas des profils parfaits. On cherche des personnes qui souhaitent
              s’engager dans un travail porteur de vraies valeurs humaines.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              <ChecklistItem icon={GraduationCap}>
                Être étudiant, dans n’importe quelle filière, avec un intérêt sincère pour
                l’accompagnement des personnes âgées.
              </ChecklistItem>
              <ChecklistItem icon={ShieldCheck}>
                Avoir un casier judiciaire vierge (B3, vérification obligatoire avant toute mise en
                relation).
              </ChecklistItem>
              <ChecklistItem icon={FileCheck2}>
                Valider la formation interne AlterAges avant la première intervention.
              </ChecklistItem>
            </ul>
          </div>

          <div>
            <span className="eyebrow">Vos questions</span>
            <h2 className="heading-serif h2">FAQ</h2>
            <div className="mt-6">
              <Accordion>
                <AccordionItem
                  groupName="faq-etudiants"
                  question="Puis-je candidater avec peu de disponibilités ?"
                >
                  Oui. AlterAges ne vous impose pas de nombre d’heures minimum. En revanche, plus
                  vous êtes disponible, plus vous serez contacté rapidement pour une mission.
                </AccordionItem>
                <AccordionItem
                  groupName="faq-etudiants"
                  question="Est-ce compatible avec un emploi du temps chargé ?"
                >
                  Oui. Vous mettez à jour vos disponibilités quand vous le souhaitez. Si vous avez
                  des partiels ou un stage, vous signalez une indisponibilité temporaire. AlterAges
                  organise le remplacement.
                </AccordionItem>
                <AccordionItem groupName="faq-etudiants" question="Comment je suis payé ?">
                  Vous êtes salarié directement du bénéficiaire, via le CESU. AlterAges gère les
                  déclarations à votre place. Vous recevez votre salaire entre le 1er et le 5 du
                  mois suivant les interventions, avec un bulletin de salaire édité automatiquement
                  par l’URSSAF.
                </AccordionItem>
                <AccordionItem
                  groupName="faq-etudiants"
                  question="Que se passe-t-il si je pars en stage plusieurs semaines ?"
                >
                  Vous prévenez AlterAges en avance. On organise un remplacement temporaire auprès
                  de votre bénéficiaire et on maintient votre profil dans le vivier. À votre retour,
                  vous reprenez là où vous en étiez.
                </AccordionItem>
                <AccordionItem
                  groupName="faq-etudiants"
                  question="Je ne suis pas en filière de santé, puis-je candidater ?"
                >
                  Oui. AlterAges recrute des étudiants de toutes filières. Ce qui compte, c’est
                  votre engagement envers les personnes âgées et votre capacité à créer un lien de
                  confiance.
                </AccordionItem>
                <AccordionItem
                  groupName="faq-etudiants"
                  question="Quelles zones d’intervention sont couvertes ?"
                >
                  AlterAges intervient dans tous les arrondissements de Lyon (1er au 9e),
                  Villeurbanne et Caluire-et-Cuire. Lors de votre candidature, vous cochez les
                  arrondissements où vous êtes prêt à vous déplacer.
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- CTA FINAL ---------- */}
      <Section tone="warm" id="rejoindre" className="bg-terra text-white">
        <div className="text-center">
          <h2 className="heading-serif h2 mx-auto max-w-2xl text-white">
            Prêt à rejoindre l’aventure ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-[1.9] text-white/80">
            Pas de CV ni de lettre de motivation. Une candidature rapide, une réponse rapide. Le
            lancement est prévu pour septembre 2026 — c’est maintenant qu’on constitue l’équipe.
          </p>

          <div className="mt-10 flex justify-center">
            <InterestButton variant="on-terra" />
          </div>
        </div>
      </Section>
    </>
  );
}
