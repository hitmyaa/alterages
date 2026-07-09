import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  FileCheck2,
  Home,
  Linkedin,
  type LucideIcon,
  Mail,
  MapPin,
  Phone,
  Quote,
  Search,
  X,
} from 'lucide-react';
import Image from 'next/image';

import { MissionCard } from '@/components/blocks';
import { TrackedLink } from '@/components/site/tracked-link';
import { missions } from '@/lib/missions';

import { ContactForm } from './_components/contact-form';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PrescripteursSection />
      <EtudiantsSection />
      <TarifSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

/* ---------------------------------------------------------- HERO */

function HeroSection() {
  return (
    <section
      id="accueil"
      className="bg-warm relative overflow-hidden px-6 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28"
    >
      {/* Halo terracotta haut-droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(184,92,44,0.09) 0%, transparent 65%)',
        }}
      />
      {/* Halo sauge bas-gauche */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(92,122,98,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="container relative z-10 grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="animate-fade-up flex flex-col justify-center">
          <span className="border-sage-light/60 bg-warm text-sage mb-7 inline-flex w-fit items-center gap-2 self-start rounded-full border px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="bg-sage absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-sage relative inline-flex h-1.5 w-1.5 rounded-full" />
            </span>
            50 % de crédit d'impôt
          </span>

          <h1 className="text-deep max-w-xl font-serif text-[clamp(2.2rem,4.5vw,4rem)] font-normal italic leading-[1.1] tracking-tight">
            Quand la <span className="text-terra not-italic">jeunesse</span> prend soin de la{' '}
            <span className="text-terra not-italic">sagesse</span>
          </h1>

          <p className="text-mid mt-6 max-w-md text-[0.95rem] leading-[1.95]">
            Des services d'aide à domicile assurés par des étudiants formés et engagés.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <TrackedLink
              href="#contact"
              ctaLocation="hero"
              ctaLabel="Je cherche un accompagnement"
              className="bg-terra hover:bg-terra-dark inline-flex w-full items-center justify-center rounded-sm px-7 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:w-auto sm:justify-start"
            >
              Je cherche un accompagnement
            </TrackedLink>
            <TrackedLink
              href="/etudiants"
              ctaLocation="hero"
              ctaLabel="Devenir étudiant AlterAges"
              className="border-bd text-mid hover:border-terra hover:text-terra inline-flex w-full items-center justify-center rounded-sm border px-7 py-3 text-sm transition-colors sm:w-auto sm:justify-start"
            >
              Devenir étudiant AlterAges
            </TrackedLink>
          </div>
        </div>

        {/* Visuel hero — la hauteur est dict\u00e9e par le bloc texte \u00e0 gauche ; l'image
             crop via object-cover pour remplir cette hauteur. Masqu\u00e9e sous lg. */}
        <div className="animate-fade-up relative hidden lg:flex lg:[animation-delay:120ms]">
          <div className="ring-bd/60 relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(61,48,32,0.25)] ring-1">
            <Image
              src="/images/image-principale.png"
              alt="Accompagnement intergénérationnel AlterAges : une jeune étudiante et une personne âgée"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- SERVICES */

function ServicesSection() {
  return (
    <section id="services" className="bg-deep px-6 py-24 text-white md:py-28">
      <div className="container">
        <span className="eyebrow-invert">Nos services</span>
        <h2 className="heading-serif max-w-2xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1] text-white">
          Ce que fait AlterAges, concrètement
        </h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.8] text-white/65">
          Des interventions du quotidien, assurées par des étudiants formés et sélectionnés, dans un
          cadre non médicalisé.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {missions.map((m) => (
            <MissionCard
              key={m.title}
              title={m.title}
              description={m.description}
              image={m.image}
              imageAlt={m.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- PRESCRIPTEURS */

const vousItems = [
  'Vous nous recevez pour la visite à domicile',
  'Vous choisissez votre intervenant',
  'Vous signez et restez décideur à chaque étape',
] as const;

const nousItems = [
  "Sélection, présentation et cadrage de l'intervenant",
  'Contrats, déclarations URSSAF, mise en place du CESU',
  'Coordination, remplacements et suivi au quotidien',
  'Aides, attestations fiscales et démarches associées',
] as const;

function PrescripteursSection() {
  return (
    <section id="aidants" className="bg-warm px-6 py-24 md:py-28">
      <div className="container">
        <span className="eyebrow">Pour les aidants</span>
        <h2 className="heading-serif text-deep max-w-2xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1]">
          L'employeur, c'est vous.
          <br />
          L'administratif, c'est nous.
        </h2>
        <p className="text-mid mt-4 max-w-xl text-[0.95rem] leading-[1.9]">
          Vous restez décideur. Nous prenons en charge la construction du dossier, la coordination
          et le suivi, avec vous, à chaque étape.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <RoleColumn badge="L'employeur, c'est vous" accent="terra" items={vousItems} />
          <RoleColumn badge="L'administratif, c'est nous" accent="sage" items={nousItems} />
        </div>

        <div className="mt-16">
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-0">
            <div
              aria-hidden
              className="absolute left-8 right-8 top-6 hidden h-px md:block"
              style={{
                background: 'linear-gradient(to right, #B85C2C, #5C7A62)',
              }}
            />
            {steps.map(({ icon: Icon, title, description }, idx) => (
              <li
                key={title}
                className="group relative flex flex-col items-center text-center md:px-3"
              >
                <div className="border-terra bg-warm text-terra group-hover:bg-terra relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] font-sans text-base font-semibold tabular-nums transition-all group-hover:text-white">
                  <span className="group-hover:hidden">{idx + 1}</span>
                  <Icon className="hidden h-5 w-5 group-hover:block" aria-hidden />
                </div>
                <h4 className="text-deep mt-4 font-serif text-[0.95rem]">{title}</h4>
                <p className="text-mid mt-1 max-w-[200px] text-[0.78rem] leading-[1.55]">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 text-center">
          <TrackedLink
            href="#contact"
            ctaLocation="aidants_section"
            ctaLabel="Demander un premier échange"
            className="bg-terra hover:bg-terra-dark group inline-flex items-center gap-2 rounded-sm px-7 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Demander un premier échange
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function RoleColumn({
  badge,
  accent,
  items,
}: {
  badge: string;
  accent: 'terra' | 'sage';
  items: readonly string[];
}) {
  const badgeClass = accent === 'terra' ? 'text-terra border-terra' : 'text-sage border-sage';
  const iconClass = accent === 'terra' ? 'text-terra' : 'text-sage';
  return (
    <div className="border-bd bg-cream rounded-xl border p-6">
      <span
        className={`inline-block rounded-full border px-3.5 py-1 text-[0.72rem] font-medium ${badgeClass}`}
      >
        {badge}
      </span>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((it) => (
          <li key={it} className="text-mid flex items-start gap-2.5 text-[0.88rem] leading-[1.6]">
            <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section id="temoignages" className="bg-cream bg-grain px-6 py-24 md:py-28">
      <div className="container">
        <span className="eyebrow">Ce qu'en disent les professionnels</span>
        <h2 className="heading-serif text-deep max-w-2xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1]">
          Témoignages
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Testimonial
            quote="C'est sécurisant. Le fait d'avoir un interlocuteur principal permet de lever la crainte des bénéficiaires de faire entrer quelqu'un chez eux."
            role="Médecin généraliste · Lyon 6e"
          />
          <Testimonial
            quote="Faustine m'a accompagné comme auxiliaire de vie pendant sept ans. Sa compétence, son efficacité et son énergie m'ont convaincu qu'elle a toutes les capacités pour mener ce projet à terme. Je soutiens inconditionnellement AlterAges."
            role="Docteur Ingénieur CNRS en retraite · Lyon 2e"
          />
          <Testimonial
            quote="Le modèle mandataire, c'est fait pour durer. Les familles savent à qui s'adresser, les bénéficiaires ont un interlocuteur de confiance. C'est ça qui crée une vraie relation dans le temps."
            role="Professionnelle du secteur · 10 ans en aide à domicile"
          />
        </div>
      </div>
    </section>
  );
}

function Testimonial({ quote, role, meta }: { quote: string; role: string; meta?: string }) {
  return (
    <article className="border-bd bg-warm rounded-xl border p-6">
      <Quote className="text-terra h-5 w-5" aria-hidden />
      <p className="text-mid mt-4 text-[0.88rem] italic leading-[1.8]">&laquo; {quote} &raquo;</p>
      <div className="border-bd mt-4 border-t pt-3 text-[0.74rem] tracking-wide">
        <strong className="text-deep block font-medium">{role}</strong>
        {meta ? <span className="text-light">{meta}</span> : null}
      </div>
    </article>
  );
}

/* ---------------------------------------------------------- ÉTUDIANTS */

function EtudiantsSection() {
  return (
    <section id="etudiants" className="bg-cream bg-grain px-6 py-24 md:py-28">
      <div className="container grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="eyebrow">Vos futurs intervenants</span>
          <h2 className="heading-serif text-deep max-w-md font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1]">
            Des étudiants du médico-social, choisis pour leur engagement
          </h2>
          <p className="text-mid mt-6 max-w-md text-[0.95rem] leading-[1.95]">
            Avant chaque mise en relation, nous sélectionnons et formons des étudiants du secteur
            médico-social et social. Voici ce qui les distingue avant qu'ils n'entrent chez votre
            proche.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            <ChecklistItem>
              Bénévolat, stages en établissement, expériences auprès de personnes âgées : valorisés
              au même titre que le diplôme
            </ChecklistItem>
            <ChecklistItem>
              Sélection sur profil, entretien de motivation et vérification du casier judiciaire
            </ChecklistItem>
            <ChecklistItem>
              Formation interne obligatoire avant toute première intervention : communication
              bienveillante, gestes adaptés aux personnes fragiles, limites d'intervention, posture
              professionnelle
            </ChecklistItem>
          </ul>

          <p className="text-light mt-8 text-center text-[0.82rem] leading-[1.6]">
            Vous êtes étudiant·e et souhaitez nous rejoindre&nbsp;?{' '}
            <TrackedLink
              href="/etudiants"
              ctaLocation="intervenants_section"
              ctaLabel="Découvrir le programme étudiant"
              className="text-terra hover:text-terra-dark font-medium underline-offset-4 transition-colors hover:underline"
            >
              Découvrir le programme étudiant →
            </TrackedLink>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 self-start lg:mt-[10.5rem]">
          <ProfileCard
            name="Léa, 22 ans"
            meta="Travail social · Lyon 3"
            badge="Compagnie · Numérique"
            accent="#D4B595"
          />
          <ProfileCard
            name="Théo, 24 ans"
            meta="Psychologie gérontologique"
            badge="Repas · Lien social"
            accent="#96B89B"
          />
          <ProfileCard
            name="Camille, 21 ans"
            meta="BTS SP3S · Bénévolat EHPAD"
            badge="Ménage · Compagnie"
            accent="#D4784A"
          />
          <ProfileCard
            name="Rayan, 26 ans"
            meta="Infirmier en formation · CHU Lyon"
            badge="Repas · Courses"
            accent="#B0A08A"
          />

          <p className="text-light col-span-2 pt-2 text-[0.72rem] leading-[1.6]">
            * Ces profils sont illustratifs et représentent le type d'intervenants que recrute
            AlterAges.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="border-terra bg-warm text-mid flex items-start gap-3 rounded-lg border-l-2 px-4 py-3 text-[0.88rem] leading-[1.65]">
      <CheckCircle2 className="text-terra mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function ProfileCard({
  name,
  meta,
  badge,
  accent,
}: {
  name: string;
  meta: string;
  badge: string;
  accent: string;
}) {
  const initial = name.charAt(0);
  return (
    <article className="border-bd bg-warm hover:border-sage-light group rounded-xl border p-5 text-center transition-all hover:-translate-y-1">
      <div
        className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full font-sans text-lg font-semibold text-white"
        style={{ background: accent }}
      >
        {initial}
      </div>
      <div className="text-deep text-[0.92rem] font-medium">{name}</div>
      <div className="text-mid mt-1 text-[0.75rem] leading-snug">{meta}</div>
      <span className="bg-sage-light/20 text-sage mt-3 inline-block rounded-full px-3 py-0.5 text-[0.66rem] font-medium tracking-wide">
        {badge}
      </span>
    </article>
  );
}

/* ---------------------------------------------------------- SUIVI */

const steps = [
  {
    icon: Mail,
    title: 'Contact',
    description: 'Recueil des besoins. Réponse sous 24h.',
  },
  {
    icon: Home,
    title: 'Visite domicile',
    description: 'Gratuite. Contexte, habitudes, préférences.',
  },
  {
    icon: Search,
    title: 'Mise en relation',
    description: '1 à 3 profils présentés. Le bénéficiaire choisit.',
  },
  {
    icon: FileCheck2,
    title: 'Contractualisation',
    description: 'Contrats, CESU, formation : tout pris en charge.',
  },
  {
    icon: CalendarCheck2,
    title: 'Suivi continu',
    description: 'Interventions vérifiées. Imprévus gérés.',
  },
] as const;

/* ---------------------------------------------------------- TARIF */

const comparisonRows = [
  {
    label: "Employeur de l'intervenant",
    alt: "L'organisme",
    good: 'Le bénéficiaire',
  },
  {
    label: 'Marge sur les heures',
    alt: 'Oui, souvent opaque',
    good: 'Aucune',
  },
  {
    label: "Crédit d'impôt 50%",
    alt: 'Partiel',
    good: 'Sur 100% des dépenses',
  },
  {
    label: 'Frais cachés',
    alt: 'Fréquents',
    good: 'Zéro',
  },
  {
    label: "Profil de l'intervenant",
    alt: 'Auxiliaire polyvalent·e',
    good: 'Étudiant qualifié',
  },
  {
    label: "Choix de l'intervenant",
    alt: 'Imposé',
    good: 'Au choix',
  },
  {
    label: "Lien avec l'intervenant",
    alt: 'Indirect, rotations fréquentes',
    good: 'Direct, stable, choisi',
  },
  {
    label: 'Dimension sociale',
    alt: 'Tâches à exécuter',
    good: 'Lien intergénérationnel',
  },
  {
    label: 'Engagement',
    alt: 'Préavis contractuel',
    good: 'Sans engagement',
  },
] as const;

function TarifSection() {
  return (
    <section id="pourquoi" className="bg-warm px-6 py-24 md:py-28">
      <div className="container">
        <span className="eyebrow">Pourquoi AlterAges</span>
        <h2 className="heading-serif text-deep max-w-3xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1]">
          Moins cher qu'un prestataire,
          <br />
          infiniment plus humain
        </h2>
        <p className="text-mid mt-4 max-w-2xl text-[0.95rem] leading-[1.8]">
          Le bénéficiaire paie directement le salaire de son intervenant. AlterAges facture un
          forfait de gestion mensuel fixe, couvrant toute l'administration.
        </p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Tableau comparatif — colonne gauche */}
          <div className="border-bd bg-warm overflow-hidden rounded-xl border">
            {/* Desktop */}
            <table className="hidden w-full border-collapse text-left md:table">
              <thead>
                <tr>
                  <th className="bg-sage px-3 py-3 text-[0.68rem] font-medium uppercase tracking-[0.09em] text-white">
                    Critère
                  </th>
                  <th className="bg-[#4a3a28] px-3 py-3 text-[0.68rem] font-medium uppercase tracking-[0.09em] text-white">
                    Prestataire
                  </th>
                  <th className="bg-terra px-3 py-3 text-[0.68rem] font-medium uppercase tracking-[0.09em] text-white">
                    AlterAges
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-bd border-t">
                    <td className="bg-cream text-deep whitespace-nowrap px-3 py-2.5 text-[0.78rem] font-medium">
                      {row.label}
                    </td>
                    <td className="bg-cream whitespace-nowrap px-3 py-2.5 text-[0.78rem]">
                      <span className="text-light inline-flex items-center gap-1.5">
                        <X className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {row.alt}
                      </span>
                    </td>
                    <td className="text-terra whitespace-nowrap bg-[#fef2ea] px-3 py-2.5 text-[0.78rem] font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="text-terra h-3.5 w-3.5 shrink-0" aria-hidden />
                        {row.good}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile — cartes compactes avec header comparatif */}
            <div className="md:hidden">
              <div className="border-bd grid grid-cols-2 border-b">
                <div className="bg-[#4a3a28] px-4 py-2.5 text-center text-[0.68rem] font-medium uppercase tracking-[0.09em] text-white">
                  Prestataire
                </div>
                <div className="bg-terra px-4 py-2.5 text-center text-[0.68rem] font-medium uppercase tracking-[0.09em] text-white">
                  AlterAges
                </div>
              </div>

              <div className="divide-bd flex flex-col divide-y">
                {comparisonRows.map((row) => (
                  <article key={row.label} className="bg-warm px-4 py-4">
                    <h3 className="text-sage text-[0.75rem] font-medium uppercase tracking-[0.08em]">
                      {row.label}
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-3 text-[0.82rem]">
                      <div className="text-light flex items-start gap-1.5">
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span>{row.alt}</span>
                      </div>
                      <div className="text-terra flex items-start gap-1.5 font-medium">
                        <CheckCircle2
                          className="text-terra mt-0.5 h-3.5 w-3.5 shrink-0"
                          aria-hidden
                        />
                        <span>{row.good}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Cartes détaillées — colonne droite */}
          <div className="flex flex-col gap-4">
            <InfoCard
              title="Salaire de l'étudiant"
              description="Payé directement par la famille via CESU, charges comprises. Aucune marge, aucun intermédiaire."
            />
            <InfoCard
              title="Forfait de gestion mensuel"
              description="Un forfait unique et fixe couvrant sélection, contrats, CESU, bulletins de salaire, suivi et remplacements : 69 €/mois, soit 34,50 € après crédit d'impôt. Voir le détail sur la page Tarifs."
            />
            <div className="bg-deep flex items-center gap-5 rounded-xl px-6 py-5 text-white">
              <div className="text-terra-light font-sans text-[2.75rem] font-bold tabular-nums leading-none tracking-tight">
                50<span className="ml-0.5 align-top text-xl font-semibold">%</span>
              </div>
              <div className="text-[0.83rem] leading-[1.75] text-white/60">
                <strong className="block font-medium text-white">Crédit d'impôt famille</strong>
                Sur la totalité des dépenses, salaire et forfait. Le coût réel est divisé par deux.
              </div>
            </div>
          </div>
        </div>

        <p className="text-light mt-10 text-center text-[0.82rem] leading-[1.6]">
          Vous êtes étudiant·e ?{' '}
          <TrackedLink
            href="/etudiants#pourquoi"
            ctaLocation="tarif_section"
            ctaLabel="Voir la rémunération étudiante"
            className="text-terra hover:text-terra-dark font-medium underline-offset-4 transition-colors hover:underline"
          >
            Voir la rémunération étudiante →
          </TrackedLink>
        </p>
      </div>
    </section>
  );
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-bd bg-warm rounded-xl border px-6 py-5">
      <h4 className="text-deep font-serif text-[0.98rem]">{title}</h4>
      <p className="text-mid mt-1.5 text-[0.83rem] leading-[1.8]">{description}</p>
    </div>
  );
}

/* ---------------------------------------------------------- PRICING */

const pricingPrestations = [
  "Sélection et présentation de l'intervenant",
  'Rédaction des contrats et démarches CESU',
  'Planning, remplacements et suivi au quotidien',
  'Messagerie directe avec Faustine',
  'Accompagnement des démarches administratives',
] as const;

function PricingSection() {
  return (
    <section id="tarifs" className="bg-deep px-6 py-24 text-white md:py-28">
      <div className="container">
        <span className="eyebrow-invert">Tarifs</span>
        <h2 className="heading-serif max-w-2xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1] text-white">
          Un forfait unique, tout compris
        </h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.8] text-white/65">
          Vous rémunérez directement l'intervenant en CESU. AlterAges facture un seul forfait
          mensuel qui couvre toute la gestion administrative de la relation.
        </p>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* Carte prix */}
          <div className="border-bd bg-cream rounded-2xl border p-8 text-center">
            <p className="text-light text-[0.85rem]">69 € avant crédit d'impôt</p>
            <p className="mt-1 flex items-baseline justify-center gap-1.5">
              <span className="text-terra font-sans text-[3rem] font-bold leading-none tracking-tight">
                34,50 €
              </span>
              <span className="text-mid text-[0.9rem]">/ mois</span>
            </p>
            <span className="bg-sage-light/25 text-sage mt-4 inline-block rounded-full px-3.5 py-1 text-[0.72rem] font-medium tracking-wide">
              50 % de crédit d'impôt appliqué
            </span>
            <p className="text-mid mt-4 text-[0.85rem] leading-[1.7]">
              Premier mois découverte à 19 €, sans engagement.
            </p>
          </div>

          {/* Résumé des prestations */}
          <div>
            <ul className="flex flex-col gap-2.5">
              {pricingPrestations.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9rem] text-white/80">
                  <CheckCircle2 className="text-terra-light mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.9rem]">
              <TrackedLink
                href="/tarifs"
                ctaLocation="pricing_section"
                ctaLabel="En savoir plus sur les tarifs"
                className="text-terra-light font-medium underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                En savoir plus →
              </TrackedLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- CONTACT */

function ContactSection() {
  return (
    <section id="contact" className="bg-warm px-6 py-24 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="heading-serif text-deep font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1]">
            Parlons de votre besoin
          </h2>

          <div className="bg-deep mt-7 flex items-start gap-5 rounded-xl px-6 py-5">
            <div className="bg-terra ring-terra/40 relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 sm:h-24 sm:w-24">
              <Image
                src="/images/faustine.webp"
                alt="Portrait de Faustine Sornay"
                fill
                sizes="(min-width: 640px) 96px, 80px"
                className="object-cover"
              />
            </div>
            <div>
              <strong className="block text-[0.95rem] font-semibold text-white">
                Faustine Sornay
              </strong>
              <span className="block text-[0.82rem] text-white/80">
                Porteuse du projet AlterAges · Lyon
              </span>
              <span className="mt-2 block text-[0.8rem] leading-[1.7] text-white/75">
                Après 7 ans comme auxiliaire de vie, j'ai fondé AlterAges avec une idée simple :
                replacer l'humain et le lien intergénérationnel au cœur d'un modèle d'aide à
                domicile repensé.
              </span>
            </div>
          </div>

          <p className="text-mid mt-5 max-w-md text-[0.92rem] leading-[1.95]">
            Professionnel du secteur, famille, partenaire : contactez-nous. Plus tôt on échange,
            mieux on construit un accompagnement qui répond vraiment à vos besoins.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <CoordItem
              icon={Mail}
              label="Email"
              value="contact@alter-ages.fr"
              href="mailto:contact@alter-ages.fr"
            />
            <CoordItem
              icon={Phone}
              label="Téléphone"
              value="06 73 87 75 71"
              href="tel:+33673877571"
            />
            <CoordItem
              icon={Linkedin}
              label="LinkedIn"
              value="Faustine Sornay"
              href="https://www.linkedin.com/in/faustine-sornay/"
              external
            />
            <CoordItem icon={MapPin} label="Territoire" value="Lyon et agglomération (69)" />
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function CoordItem({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <div className="bg-warm text-terra flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <div>
        <strong className="text-light block text-[0.67rem] font-medium uppercase tracking-[0.1em]">
          {label}
        </strong>
        <span className="text-deep text-[0.9rem]">{value}</span>
      </div>
    </>
  );

  const className =
    'flex items-center gap-4 rounded-xl border border-bd bg-cream px-5 py-3.5 transition-all hover:translate-x-1 hover:border-terra';

  if (href) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}
