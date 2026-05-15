import type { Metadata } from 'next';
import {
  ClipboardCheck,
  HandHeart,
  Heart,
  Landmark,
  Linkedin,
  type LucideIcon,
  Mail,
  MapPin,
  Phone,
  ScrollText,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

import { ChecklistItem, FeatureCard, InfoCard, Section, SectionHeader } from '@/components/blocks';

export const metadata: Metadata = {
  title: 'À propos · AlterAges',
  description:
    "L'histoire, les convictions et le cadre juridique d'AlterAges, une association lyonnaise qui réinvente l'aide à domicile grâce au lien intergénérationnel.",
};

/* ------------------------------------------------------------------ */
/*                         CONTENU STATIQUE                            */
/* ------------------------------------------------------------------ */

const convictions = [
  "Vieillir chez soi est un droit, pas un privilège. L'organisation doit s'adapter à la personne, jamais l'inverse.",
  "Le lien humain est aussi essentiel que les gestes techniques. Une présence régulière et choisie soigne autant qu'elle accompagne.",
  'La jeunesse a sa place auprès des aînés. Bien encadrée, formée et choisie, elle apporte une énergie qui manque cruellement au secteur.',
  'La transparence des coûts est une condition de la confiance. Aucune marge cachée, aucun frais déguisé.',
  "L'administration ne doit pas peser sur les familles. Tout ce qui peut être pris en charge doit l'être.",
];

const whatWeAre = [
  {
    icon: Landmark,
    title: 'Association loi 1901',
    description:
      'AlterAges est une association à but non lucratif. Aucun actionnaire à rémunérer : chaque euro sert le projet, les bénéficiaires et les étudiants.',
  },
  {
    icon: ScrollText,
    title: 'Modèle mandataire',
    description:
      "Le bénéficiaire reste l'employeur de son intervenant·e. AlterAges agit comme mandataire : nous sélectionnons, formons, contractualisons et gérons toute l'administration en son nom.",
  },
  {
    icon: ClipboardCheck,
    title: 'Agrément SAP en instruction',
    description:
      "Notre demande d'agrément Services à la Personne est en cours d'instruction auprès de la DREETS. Une fois obtenu, il ouvrira le droit au crédit d'impôt de 50 % sur 100 % des dépenses engagées.",
  },
];

const differentiators = [
  {
    icon: Heart,
    title: 'Le lien intergénérationnel',
    description:
      "Les intervenants sont des étudiants du médico-social, choisis pour leur engagement autant que pour leur parcours. Le bénéficiaire garde le même interlocuteur dans le temps : une relation qui s'installe, pas une rotation.",
  },
  {
    icon: Sparkles,
    title: 'La transparence des coûts',
    description:
      "Le bénéficiaire paie directement le salaire de son intervenant·e via le CESU. AlterAges facture un forfait de gestion mensuel fixe, communiqué d'avance. Pas de marge cachée sur les heures, pas de frais surprise.",
  },
  {
    icon: HandHeart,
    title: 'La gestion administrative prise en charge',
    description:
      "Contrats, déclarations CESU, bulletins de salaire, attestations fiscales, remplacements, suivi : tout est géré par AlterAges. Les familles gardent l'esprit tranquille, sans renoncer au modèle mandataire.",
  },
];

const milestones = [
  {
    label: 'Aujourd’hui',
    title: 'Construction du projet',
    description:
      "Affinage du modèle avec des professionnels du secteur, des familles et de futurs étudiants. Recueil des premières manifestations d'intérêt.",
  },
  {
    label: 'Été 2026',
    title: 'Obtention de l’agrément SAP',
    description:
      "Finalisation de l'instruction par la DREETS. Activation du crédit d'impôt à 50 % pour les bénéficiaires.",
  },
  {
    label: 'Septembre 2026',
    title: 'Lancement opérationnel à Lyon',
    description:
      'Premières mises en relation entre seniors et étudiants formés sur Lyon et son agglomération. Démarrage progressif et encadré.',
  },
];

/* ------------------------------------------------------------------ */
/*                              PAGE                                   */
/* ------------------------------------------------------------------ */

export default function AProposPage() {
  return (
    <>
      <HeroSection />
      <OrigineSection />
      <ConvictionsSection />
      <IsolementSection />
      <CeQueNousSommesSection />
      <DifferentiateurSection />
      <CadreLegalSection />
      <ContactSection />
    </>
  );
}

/* ---------- HERO ---------- */
function HeroSection() {
  return (
    <section className="bg-warm relative overflow-hidden px-6 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(184,92,44,0.09) 0%, transparent 65%)',
        }}
      />
      <div className="container relative z-10 max-w-3xl">
        <span className="eyebrow">À propos</span>
        <h1 className="heading-serif text-deep font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.1]">
          Une association lyonnaise qui réinvente <em>l’aide à domicile</em>.
        </h1>
        <p className="lead mt-6 max-w-2xl">
          AlterAges fait le pari que la jeunesse, bien formée et bien encadrée, peut transformer
          l’accompagnement à domicile des personnes âgées. Voici comment et pourquoi ce projet est
          né, ce qu’il est juridiquement, et où il en est aujourd’hui.
        </p>
      </div>
    </section>
  );
}

/* ---------- ORIGINE ---------- */
function OrigineSection() {
  return (
    <Section tone="cream" grain>
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <SectionHeader
            eyebrow="L’origine du projet"
            title={
              <>
                Sept ans <em>au chevet des aînés</em>, et un constat qui revenait sans cesse.
              </>
            }
          />
          <div className="text-mid mt-8 max-w-xl space-y-5 text-[0.95rem] leading-[1.95]">
            <p>
              AlterAges est porté par <strong className="text-deep">Faustine Sornay</strong>,
              auxiliaire de vie pendant sept ans à Lyon. Sept années à entrer dans des intérieurs, à
              connaître des familles, à voir ce qui fonctionnait, et ce qui faisait défaut.
            </p>
            <p>
              Trop de rotations d’intervenants. Des bénéficiaires qui ne savent plus à qui parler.
              Des familles épuisées par l’administratif. Des coûts opaques. Et, en arrière-plan, un
              isolement qui grandit silencieusement dans les appartements lyonnais.
            </p>
            <p>
              L’idée d’AlterAges est née de cette expérience : et si l’on confiait une partie de ces
              missions à des étudiants du médico-social (formés, sélectionnés, encadrés) dans un
              cadre juridique propre et transparent&nbsp;? Pour redonner du temps long, du lien
              humain et de la lisibilité à un secteur qui en manque.
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-28">
          <div className="bg-deep flex items-start gap-5 rounded-xl px-6 py-6">
            <div className="bg-terra ring-terra/40 relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 sm:h-24 sm:w-24">
              <Image
                src="/images/faustine.webp"
                alt="Portrait de Faustine Sornay, fondatrice d’AlterAges"
                fill
                sizes="(min-width: 640px) 96px, 80px"
                className="object-cover"
              />
            </div>
            <div>
              <strong className="block text-[1rem] font-semibold text-white">
                Faustine Sornay
              </strong>
              <span className="block text-[0.82rem] text-white/80">Fondatrice · Lyon</span>
              <span className="mt-3 block text-[0.82rem] leading-[1.7] text-white/75">
                « Pendant sept ans, j’ai vu de l’intérieur ce que vivent les personnes âgées à
                domicile. AlterAges, c’est ce que j’aurais voulu pouvoir leur proposer. »
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- CONVICTIONS ---------- */
function ConvictionsSection() {
  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="Les convictions"
        title={
          <>
            Cinq principes qui <em>structurent</em> chaque décision.
          </>
        }
        description="AlterAges n’est pas qu’un modèle économique. Ce sont d’abord des convictions, héritées du terrain, qui orientent la manière dont nous recrutons, formons et accompagnons."
      />

      <ul className="mt-10 flex max-w-3xl flex-col gap-3">
        {convictions.map((c) => (
          <ChecklistItem key={c}>{c}</ChecklistItem>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- ISOLEMENT ---------- */
function IsolementSection() {
  return (
    <Section tone="deep">
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow-invert">La conviction première</span>
        <h2 className="heading-serif h2 mx-auto text-white">
          L’isolement n’est pas une <em>fatalité</em>.
        </h2>
        <p className="lead mx-auto mt-6 text-white/75">
          En France, plus de deux millions de personnes âgées vivent une forme d’isolement
          relationnel sévère. Ce n’est pas une conséquence inévitable du grand âge : c’est le
          résultat d’une organisation collective. AlterAges existe pour démontrer qu’une autre
          organisation est possible, où la présence régulière, le lien choisi et la continuité dans
          le temps redeviennent la norme.
        </p>
      </div>
    </Section>
  );
}

/* ---------- CE QUE NOUS SOMMES ---------- */
function CeQueNousSommesSection() {
  return (
    <Section tone="cream" grain>
      <SectionHeader
        eyebrow="Ce qu’est AlterAges, juridiquement"
        title={
          <>
            Le <em>cadre</em>, en clair.
          </>
        }
        description="Un projet sérieux se reconnaît à la lisibilité de son cadre. Voici, sans détour, ce qu’AlterAges est et n’est pas."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {whatWeAre.map((item) => (
          <FeatureCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <p className="text-light mt-8 max-w-3xl text-[0.78rem] leading-[1.7]">
        AlterAges n’est ni une plateforme de mise en relation auto-entrepreneurs, ni un prestataire
        classique d’aide à domicile. Le modèle mandataire permet au bénéficiaire de rester employeur
        tout en étant entièrement déchargé de la gestion.
      </p>
    </Section>
  );
}

/* ---------- DIFFÉRENCIATION ---------- */
function DifferentiateurSection() {
  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="Ce qui rend AlterAges différent"
        title={
          <>
            Trois choix structurants, <em>pensés ensemble</em>.
          </>
        }
        description="Pris séparément, ces trois axes existent ailleurs. C’est leur combinaison, dans un cadre associatif, qui définit AlterAges."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {differentiators.map((item) => (
          <FeatureCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------- CADRE LÉGAL & AVANCEMENT ---------- */
function CadreLegalSection() {
  return (
    <Section tone="deep" id="avancement">
      <SectionHeader
        invert
        eyebrow="État d’avancement"
        title={
          <>
            Un projet en <em>construction publique</em>.
          </>
        }
        description="Nous n’attendons pas le lancement pour ouvrir le dialogue. Voici précisément où en est la structure, et ce qui reste à franchir."
      />

      <ol className="relative mt-12 grid gap-6 md:grid-cols-3 md:gap-0">
        <div
          aria-hidden
          className="absolute left-8 right-8 top-6 hidden h-px md:block"
          style={{
            background: 'linear-gradient(to right, #B85C2C, #5C7A62)',
          }}
        />
        {milestones.map((step, idx) => (
          <li key={step.title} className="relative flex flex-col md:px-3">
            <div className="border-terra bg-deep text-terra relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] font-sans text-base font-semibold tabular-nums">
              {idx + 1}
            </div>
            <span className="tracking-tag text-terra-light mt-4 block text-[0.67rem] font-medium uppercase">
              {step.label}
            </span>
            <h3 className="mt-1 font-serif text-[1.05rem] text-white">{step.title}</h3>
            <p className="mt-2 text-[0.85rem] leading-[1.8] text-white/70">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <InfoCard
          invert
          title="Aucun service n’est commercialisé à ce jour"
          description="Tant que l’agrément SAP n’est pas délivré, AlterAges ne facture aucune intervention. Les manifestations d’intérêt recueillies aujourd’hui nourrissent la préparation du lancement."
        />
        <InfoCard
          invert
          title="Territoire d’ouverture : Lyon et agglomération"
          description="Le démarrage se fera à l’échelle de la métropole lyonnaise (69), avec une montée en charge progressive arrondissement par arrondissement."
        />
      </div>
    </Section>
  );
}

/* ---------- CONTACT ---------- */
function ContactSection() {
  return (
    <Section tone="warm" id="contact">
      <SectionHeader
        eyebrow="Contact direct"
        title={
          <>
            Parlons-en, <em>sans intermédiaire</em>.
          </>
        }
        description="Professionnels du secteur, familles qui anticipent, partenaires potentiels : Faustine répond personnellement. Pas de standard, pas de formulaire à étages."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CoordItem
          icon={Mail}
          label="Email"
          value="contact@alter-ages.fr"
          href="mailto:contact@alter-ages.fr"
        />
        <CoordItem icon={Phone} label="Téléphone" value="06 73 87 75 71" href="tel:+33673877571" />
        <CoordItem
          icon={Linkedin}
          label="LinkedIn"
          value="Faustine Sornay"
          href="https://www.linkedin.com/in/faustine-sornay/"
          external
        />
        <CoordItem icon={MapPin} label="Territoire" value="Lyon et agglomération (69)" />
      </div>
    </Section>
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
