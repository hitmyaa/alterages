import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Home,
  Linkedin,
  type LucideIcon,
  Mail,
  MapPin,
  Phone,
  Quote,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';

import { ContactForm } from './_components/contact-form';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PrescripteursSection />
      <EtudiantsSection />
      <SuiviSection />
      <TarifSection />
      <ContactSection />
    </>
  );
}

/* ---------------------------------------------------------- HERO */

function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-warm px-6 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28"
    >
      {/* Halo terracotta haut-droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(184,92,44,0.09) 0%, transparent 65%)',
        }}
      />
      {/* Halo sauge bas-gauche */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(92,122,98,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="container relative z-10 grid min-h-[calc(100vh-58px-6rem)] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="animate-fade-up">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-sage-light/60 bg-warm px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.1em] text-sage">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Projet · Lyon · Lancement septembre 2026
          </span>

          <h1 className="font-serif text-[clamp(3rem,5.5vw,5.2rem)] font-normal leading-[0.95] tracking-tight text-deep">
            Alter<em className="font-normal italic text-terra">Ages</em>
          </h1>

          <p className="mt-4 max-w-md font-serif text-lg italic leading-snug text-mid md:text-xl">
            Quand la jeunesse prend soin de la sagesse
          </p>

          <p className="mt-6 max-w-md text-[0.95rem] leading-[1.95] text-mid">
            Des services d'aide à domicile assurés par des étudiants formés et engagés,
            avec une gestion administrative entièrement prise en charge et une
            tarification transparente, sans frais cachés.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#prescripteurs"
              className="group inline-flex items-center gap-2 rounded-sm bg-terra px-7 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-terra-dark hover:shadow-md"
            >
              Je suis prescripteur
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#etudiants"
              className="inline-flex items-center rounded-sm border border-bd px-7 py-3 text-sm text-mid transition-colors hover:border-terra hover:text-terra"
            >
              Découvrir le projet
            </a>
          </div>
        </div>

        {/* Visuel éditorial — composition abstraite en attendant une photographie */}
        <div className="relative animate-fade-up lg:[animation-delay:120ms]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(61,48,32,0.25)] ring-1 ring-bd/60">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, #FDFAF6 0%, #F0E4D0 45%, #D4B595 100%)',
              }}
            />
            <div
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
              style={{ background: 'rgba(184,92,44,0.35)' }}
              aria-hidden
            />
            <div
              className="absolute -bottom-16 -left-8 h-56 w-56 rounded-full blur-3xl"
              style={{ background: 'rgba(92,122,98,0.32)' }}
              aria-hidden
            />

            <div className="relative flex h-full flex-col justify-end p-10">
              <p className="font-serif text-[clamp(1.4rem,2.2vw,2rem)] italic leading-[1.25] text-deep">
                &laquo; Ce que j'apprécie, c'est de savoir que la famille n'est pas
                livrée à elle-même. &raquo;
              </p>
              <p className="mt-4 text-[0.78rem] uppercase tracking-[0.1em] text-mid">
                Assistante sociale · CLIC Lyon 6<sup>e</sup>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- PRESCRIPTEURS */

function PrescripteursSection() {
  return (
    <section id="prescripteurs" className="bg-deep px-6 py-24 text-white md:py-28">
      <div className="container">
        <span className="eyebrow-invert">Pour les professionnels</span>
        <h2 className="heading-serif max-w-2xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1] text-white">
          Vous orientez,<br />
          on gère tout le reste
        </h2>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-[1.9] text-white/65">
          Nous prenons en charge de A à Z tous les bénéficiaires, avec confiance et
          professionnalisme.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <PrescCard
            icon={FileCheck2}
            title="Zéro charge administrative"
            description="Toute la gestion administrative est prise en charge."
            accentFrom="rgba(184,92,44,0.35)"
          />
          <PrescCard
            icon={GraduationCap}
            title="Des étudiants formés"
            description="Tous nos étudiants suivent une formation interne obligatoire."
            accentFrom="rgba(92,122,98,0.35)"
          />
          <PrescCard
            icon={ShieldCheck}
            title="Un suivi de confiance"
            description="Un suivi peut être mis en place à la demande du prescripteur."
            accentFrom="rgba(212,120,74,0.35)"
          />
        </div>

        <div className="mt-16">
          <span className="mb-4 block text-[0.67rem] font-medium uppercase tracking-tag text-terra-light">
            Ce que disent les professionnels
          </span>
          <div className="grid gap-4 md:grid-cols-3">
            <Testimonial
              quote="Ce que j'apprécie, c'est de savoir que la famille n'est pas livrée à elle-même. Il y a quelqu'un qui gère et qui me tient au courant si besoin."
              role="Assistante sociale, CLIC Lyon 6e"
              meta="Partenaire fondatrice · avant lancement"
            />
            <Testimonial
              quote="Orienter vers des étudiants formés et suivis, c'est une garantie que je n'avais pas avec d'autres solutions. Je recommande maintenant avec confiance."
              role="Médecin généraliste, Lyon 3e"
              meta="Partenaire fondateur · avant lancement"
            />
            <Testimonial
              quote="La transparence sur les intervenants et le suivi proposé, ça change tout. Les familles que j'oriente reviennent avec du positif."
              role="Infirmière coordinatrice, SSIAD Lyon"
              meta="Partenaire fondatrice · avant lancement"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-terra/30 bg-terra/10 px-8 py-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <strong className="block text-base font-medium text-white">
              Devenir partenaire fondateur
            </strong>
            <p className="mt-1 text-sm leading-relaxed text-white/60">
              Le projet se construit et votre regard terrain est précieux. Rejoignez-nous
              avant le lancement pour co-construire l'offre.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-sm bg-white px-6 py-3 text-sm font-medium text-deep transition-opacity hover:opacity-90 md:self-auto"
          >
            Prendre contact
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function PrescCard({
  icon: Icon,
  title,
  description,
  accentFrom,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accentFrom: string;
}) {
  return (
    <article className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-7 transition-transform hover:-translate-y-1">
      <div
        aria-hidden
        className="absolute -right-12 -top-12 h-40 w-40 rounded-full blur-2xl"
        style={{ background: accentFrom }}
      />
      <div className="relative">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-terra-light">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-lg text-white">{title}</h3>
        <p className="mt-2 text-[0.85rem] leading-[1.75] text-white/70">{description}</p>
      </div>
    </article>
  );
}

function Testimonial({
  quote,
  role,
  meta,
}: {
  quote: string;
  role: string;
  meta: string;
}) {
  return (
    <article className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-6">
      <Quote className="h-5 w-5 text-terra-light" aria-hidden />
      <p className="mt-4 text-[0.88rem] italic leading-[1.8] text-white/75">
        &laquo; {quote} &raquo;
      </p>
      <div className="mt-4 border-t border-white/[0.08] pt-3 text-[0.74rem] tracking-wide">
        <strong className="block font-medium text-white/55">{role}</strong>
        <span className="text-white/35">{meta}</span>
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
          <span className="eyebrow">Le lien intergénérationnel</span>
          <h2 className="heading-serif max-w-md font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1] text-deep">
            Des étudiants du médico-social, formés et encadrés
          </h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-[1.95] text-mid">
            AlterAges recrute des étudiants du secteur médico-social et social. Nous
            valorisons autant les expériences terrain que les parcours académiques.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            <ChecklistItem>
              Bénévolat, stages en établissement, expériences auprès de personnes âgées :
              valorisés au même titre que le diplôme
            </ChecklistItem>
            <ChecklistItem>
              Sélection sur profil, entretien de motivation et vérification du casier
              judiciaire
            </ChecklistItem>
            <ChecklistItem>
              Formation interne obligatoire avant toute première intervention :
              communication bienveillante, gestes adaptés aux personnes fragiles, limites
              d'intervention, posture professionnelle
            </ChecklistItem>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 self-start">
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

          <p className="col-span-2 pt-2 text-[0.72rem] leading-[1.6] text-light">
            * Ces profils sont illustratifs et représentent le type d'intervenants
            qu'AlterAges souhaite recruter d'ici septembre 2026.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 rounded-lg border-l-2 border-sage-light bg-warm px-4 py-3 text-[0.88rem] leading-[1.65] text-mid">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
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
    <article className="group rounded-xl border border-bd bg-warm p-5 text-center transition-all hover:-translate-y-1 hover:border-sage-light">
      <div
        className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full font-serif text-lg text-white"
        style={{ background: accent }}
      >
        {initial}
      </div>
      <div className="font-serif text-[0.92rem] text-deep">{name}</div>
      <div className="mt-1 text-[0.75rem] leading-snug text-mid">{meta}</div>
      <span className="mt-3 inline-block rounded-full bg-sage-light/20 px-3 py-0.5 text-[0.66rem] font-medium tracking-wide text-sage">
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

function SuiviSection() {
  return (
    <section id="suivi" className="bg-warm px-6 py-24 md:py-28">
      <div className="container">
        <span className="eyebrow">Le suivi</span>
        <h2 className="heading-serif max-w-3xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1] text-deep">
          De l'orientation à l'intervention, un seul fil conducteur
        </h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.8] text-mid">
          Un interlocuteur unique, joignable, qui connaît le dossier. De la première
          prise de contact au suivi mensuel.
        </p>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-0">
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
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-terra bg-warm font-serif text-lg text-terra transition-all group-hover:bg-terra group-hover:text-white">
                <span className="group-hover:hidden">{idx + 1}</span>
                <Icon className="hidden h-5 w-5 group-hover:block" aria-hidden />
              </div>
              <h3 className="mt-4 font-serif text-[0.95rem] text-deep">{title}</h3>
              <p className="mt-1 max-w-[200px] text-[0.78rem] leading-[1.55] text-mid">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- TARIF */

const comparisonRows = [
  {
    label: "Employeur de l'intervenant",
    alt: { text: "L'organisme" },
    good: { text: 'Le bénéficiaire, lien direct' },
  },
  {
    label: 'Marge sur les heures',
    alt: { text: 'Oui, souvent opaque', negative: true },
    good: { text: 'Aucune', positive: true },
  },
  {
    label: "Crédit d'impôt 50%",
    alt: { text: 'Partiel' },
    good: { text: 'Sur 100% des dépenses' },
  },
  {
    label: "Choix de l'intervenant",
    alt: { text: 'Imposé', negative: true },
    good: { text: 'Au choix', positive: true },
  },
  {
    label: "Lien avec l'intervenant",
    alt: { text: 'Indirect, rotations fréquentes' },
    good: { text: 'Direct, stable, choisi' },
  },
  {
    label: 'Frais cachés',
    alt: { text: 'Fréquents', negative: true },
    good: { text: 'Zéro', positive: true },
  },
] as const;

function TarifSection() {
  return (
    <section id="tarif" className="bg-cream bg-grain px-6 py-24 md:py-28">
      <div className="container">
        <span className="eyebrow">Tarification</span>
        <h2 className="heading-serif max-w-3xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1] text-deep">
          Moins cher qu'un prestataire,<br />
          plus transparent que tout le reste
        </h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.8] text-mid">
          Le bénéficiaire paie directement le salaire de son intervenant. AlterAges
          facture un forfait de gestion mensuel fixe, couvrant toute l'administration.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="overflow-hidden rounded-xl border border-bd bg-warm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[38%] bg-cream px-4 py-3 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-light">
                    &nbsp;
                  </th>
                  <th className="bg-[#4a3a28] px-4 py-3 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-white">
                    Prestataire classique
                  </th>
                  <th className="bg-terra px-4 py-3 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-white">
                    AlterAges
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-t border-bd">
                    <td className="bg-cream px-4 py-3 text-[0.84rem] text-mid">
                      {row.label}
                    </td>
                    <td className="bg-cream px-4 py-3 text-[0.84rem] text-mid">
                      <span
                        className={
                          'negative' in row.alt && row.alt.negative
                            ? 'inline-flex items-center gap-1.5 text-light'
                            : ''
                        }
                      >
                        {'negative' in row.alt && row.alt.negative ? (
                          <X className="h-3.5 w-3.5" aria-hidden />
                        ) : null}
                        {row.alt.text}
                      </span>
                    </td>
                    <td className="bg-[#fef2ea] px-4 py-3 text-[0.84rem] font-medium text-terra">
                      <span
                        className={
                          'positive' in row.good && row.good.positive
                            ? 'inline-flex items-center gap-1.5 text-sage'
                            : ''
                        }
                      >
                        {'positive' in row.good && row.good.positive ? (
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                        ) : null}
                        {row.good.text}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4">
            <InfoCard
              title="Salaire de l'étudiant"
              description="Payé directement par la famille via CESU, charges comprises. Aucune marge, aucun intermédiaire."
            />
            <InfoCard
              title="Forfait de gestion mensuel"
              description="Un montant fixe couvrant sélection, contrats, CESU, bulletins de salaire, suivi et remplacements. Communiqué au lancement en septembre 2026."
            />
            <div className="flex items-center gap-5 rounded-xl bg-deep px-6 py-5 text-white">
              <div className="font-serif text-[2.5rem] leading-none text-terra-light">
                50<span className="align-top text-2xl">%</span>
              </div>
              <div className="text-[0.83rem] leading-[1.75] text-white/60">
                <strong className="block font-medium text-white">
                  Crédit d'impôt famille
                </strong>
                Sur la totalité des dépenses, salaire et forfait. Le coût réel est divisé
                par deux.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-bd bg-warm px-6 py-5">
      <h4 className="font-serif text-[0.98rem] text-deep">{title}</h4>
      <p className="mt-1.5 text-[0.83rem] leading-[1.8] text-mid">{description}</p>
    </div>
  );
}

/* ---------------------------------------------------------- CONTACT */

function ContactSection() {
  return (
    <section id="contact" className="bg-warm px-6 py-24 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="heading-serif font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] leading-[1.1] text-deep">
            Parlons du projet
          </h2>

          <div className="mt-7 flex items-start gap-4 rounded-xl bg-deep px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terra font-serif text-base text-white">
              FS
            </div>
            <div>
              <strong className="block text-[0.92rem] font-medium text-white">
                Faustine Sornay
              </strong>
              <span className="block text-[0.79rem] text-white/55">
                Porteuse du projet AlterAges · Lyon
              </span>
              <span className="mt-1.5 block text-[0.77rem] leading-[1.6] text-white/45">
                Ancienne auxiliaire de vie, je crée AlterAges avec une idée simple :
                replacer l'humain et le lien intergénérationnel au cœur d'un modèle
                d'aide à domicile repensé.
              </span>
            </div>
          </div>

          <p className="mt-5 max-w-md text-[0.92rem] leading-[1.95] text-mid">
            Professionnel du secteur, famille qui anticipe, partenaire potentiel :
            contactez-nous avant le lancement. Plus tôt on échange, mieux on construit
            quelque chose qui répond vraiment à vos besoins.
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
            <CoordItem
              icon={MapPin}
              label="Territoire visé"
              value="Lyon et agglomération (69)"
            />
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warm text-terra">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <div>
        <strong className="block text-[0.67rem] font-medium uppercase tracking-[0.1em] text-light">
          {label}
        </strong>
        <span className="text-[0.9rem] text-deep">{value}</span>
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
