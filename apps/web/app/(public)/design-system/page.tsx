import type { Metadata } from 'next';
import {
  CalendarCheck2,
  FileCheck2,
  Heart,
  Home,
  Mail,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';

import {
  CTABand,
  ChecklistItem,
  FeatureCard,
  Halo,
  InfoCard,
  ProfileCard,
  Section,
  SectionHeader,
  StatCard,
  StepsTimeline,
  TestimonialCard,
} from '@/components/blocks';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Design system · AlterAges',
  description:
    'Référence visuelle interne — tokens, composants UI et blocks répliquant la landing AlterAges.',
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*                         PALETTE & TYPO                             */
/* ------------------------------------------------------------------ */

const palette = [
  { name: 'cream', hex: '#F8F4EE', text: 'text-deep' },
  { name: 'warm', hex: '#FDFAF6', text: 'text-deep' },
  { name: 'bd-light', hex: '#ECE4D4', text: 'text-deep' },
  { name: 'bd', hex: '#DDD0BA', text: 'text-deep' },
  { name: 'light', hex: '#B0A08A', text: 'text-white' },
  { name: 'mid', hex: '#6A5A3E', text: 'text-white' },
  { name: 'deep', hex: '#3D3020', text: 'text-white' },
  { name: 'terra-light', hex: '#D4784A', text: 'text-white' },
  { name: 'terra', hex: '#B85C2C', text: 'text-white' },
  { name: 'terra-dark', hex: '#8E431A', text: 'text-white' },
  { name: 'sage-light', hex: '#96B89B', text: 'text-white' },
  { name: 'sage', hex: '#5C7A62', text: 'text-white' },
];

const typeScale = [
  { className: 'h-display', label: 'Display — Hero h1', sample: 'Quand la jeunesse prend soin de la sagesse' },
  { className: 'h1', label: 'H1 — Page titre', sample: 'Un accompagnement réinventé' },
  { className: 'h2', label: 'H2 — Section titre', sample: 'De l’orientation à l’intervention' },
  { className: 'h3', label: 'H3 — Sous-titre / carte', sample: 'Des étudiants formés' },
  { className: 'h4', label: 'H4 — Carte secondaire', sample: 'Forfait de gestion mensuel' },
  { className: 'lead', label: 'Lead — Paragraphe d’intro', sample: 'Des services d’aide à domicile assurés par des étudiants formés et engagés.' },
  { className: 'body-text', label: 'Body — Texte courant', sample: 'AlterAges recrute des étudiants du secteur médico-social et social.' },
  { className: 'small-text', label: 'Small — Méta / aide', sample: 'Démarches d’obtention de l’agrément SAP en cours.' },
];

/* ------------------------------------------------------------------ */
/*                              PAGE                                  */
/* ------------------------------------------------------------------ */

export default function DesignSystemPage() {
  return (
    <>
      {/* HEADER */}
      <Section tone="warm" className="py-section">
        <Halo color="terra" position="top-right" />
        <Halo color="sage" position="bottom-left" />
        <span className="eyebrow">Design system · interne</span>
        <h1 className="h-display heading-serif max-w-3xl">
          Le langage <em>visuel</em> d’AlterAges
        </h1>
        <p className="mt-6 max-w-2xl lead">
          Référence vivante des tokens, composants et blocks utilisés sur les pages
          publiques. Cette page sert d’atlas pour l’équipe et de terrain de jeu pour
          itérer avant de construire de nouvelles pages.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#palette" className="btn-primary">Palette</a>
          <a href="#typography" className="btn-outline">Typographie</a>
          <a href="#components" className="btn-outline">Composants</a>
          <a href="#blocks" className="btn-outline">Blocks</a>
        </div>
      </Section>

      {/* PALETTE */}
      <Section tone="cream" grain id="palette">
        <SectionHeader
          eyebrow="Palette"
          title="Terracotta, sauge, crème"
          description="La palette respecte le triptyque chaud-vivant / nature-calme / neutre-papier. Le `--background` shadcn pointe sur cream ; le `--primary` sur terra."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {palette.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-xl border border-bd shadow-soft"
            >
              <div
                className={`flex h-24 items-end p-3 text-[0.72rem] font-medium ${c.text}`}
                style={{ background: c.hex }}
              >
                {c.hex}
              </div>
              <div className="bg-warm px-3 py-2 text-[0.78rem] text-deep">
                <code>{c.name}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TYPOGRAPHIE */}
      <Section tone="warm" id="typography">
        <SectionHeader
          eyebrow="Typographie"
          title={<>Serif italique pour <em>l’émotion</em>, sans pour la clarté</>}
          description="Les classes utilitaires `.h1` à `.h4`, `.lead` et `.body-text` répliquent l’échelle de la landing. Le `<em>` à l’intérieur d’un titre est colorisé terra via `.heading-serif em`."
        />

        <div className="mt-12 flex flex-col gap-8">
          {typeScale.map((t) => (
            <div key={t.className} className="grid gap-2 md:grid-cols-[180px_1fr] md:items-baseline md:gap-8">
              <div className="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-light">
                <code className="text-terra">.{t.className}</code>
                <div className="mt-1 normal-case tracking-normal text-light">{t.label}</div>
              </div>
              <p className={`heading-serif ${t.className}`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPOSANTS UI */}
      <Section tone="cream" grain id="components">
        <SectionHeader
          eyebrow="Composants UI"
          title="Briques primitives"
          description="Composants atomiques de `components/ui/` — boutons, badges, séparateurs, accordéons."
        />

        {/* Buttons */}
        <SubBlock title="Boutons (utilitaires CSS)" hint="Pour les CTA marketing — utilisés sur des `<a>` natifs.">
          <div className="flex flex-wrap gap-3">
            <a href="#" className="btn-primary">Bouton primaire</a>
            <a href="#" className="btn-outline">Bouton outline</a>
          </div>
          <div className="mt-3 rounded-xl bg-deep px-6 py-4">
            <a href="#" className="btn-on-dark">Bouton sur fond sombre</a>
          </div>
        </SubBlock>

        <SubBlock title="Boutons (shadcn)" hint="Pour les formulaires et l’UI interne — pilotés par tokens sémantiques.">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </SubBlock>

        {/* Badges */}
        <SubBlock title="Badges" hint="Petites étiquettes — variantes terra / sauge, plein / outline, taille SM / MD / LG.">
          <div className="flex flex-wrap gap-3">
            <Badge variant="sage">Sage</Badge>
            <Badge variant="sage-outline" pulse>
              Lyon · Lancement septembre 2026
            </Badge>
            <Badge variant="terra">Terra</Badge>
            <Badge variant="terra-outline">Terra outline</Badge>
            <Badge variant="muted">Muted</Badge>
          </div>
          <div className="mt-3 rounded-xl bg-deep px-6 py-4">
            <Badge variant="on-dark">Sur fond sombre</Badge>
          </div>
        </SubBlock>

        {/* Separator */}
        <SubBlock title="Séparateurs">
          <Separator />
          <div className="h-6" />
          <Separator gradient />
        </SubBlock>

        {/* Accordion */}
        <SubBlock title="Accordéon (FAQ)">
          <Accordion>
            <AccordionItem question="Qui sont les étudiants intervenant à domicile ?" defaultOpen>
              Étudiants du secteur médico-social et social, sélectionnés sur profil
              avec un entretien de motivation et une vérification du casier judiciaire.
            </AccordionItem>
            <AccordionItem question="Quelle formation reçoivent-ils avant d’intervenir ?">
              Une formation interne obligatoire avant toute première intervention :
              communication bienveillante, gestes adaptés, limites d’intervention.
            </AccordionItem>
            <AccordionItem question="Comment se passe la mise en relation ?">
              Après une visite à domicile gratuite, AlterAges propose 1 à 3 profils
              au bénéficiaire qui fait son choix.
            </AccordionItem>
          </Accordion>
        </SubBlock>
      </Section>

      {/* BLOCKS */}
      <Section tone="warm" id="blocks">
        <SectionHeader
          eyebrow="Blocks"
          title="Composants composites"
          description="Patterns récurrents de la landing prêts à composer — cartes, témoignages, timeline, bandes CTA."
        />

        {/* Feature cards (icon) */}
        <SubBlock title="FeatureCard — mode icône">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={ShieldCheck}
              title="Zéro paperasse"
              description="Contrats, CESU, bulletins de salaire : tout est pris en charge."
            />
            <FeatureCard
              icon={Users}
              title="Étudiants formés"
              description="Formation interne obligatoire avant toute intervention."
            />
            <FeatureCard
              icon={Heart}
              title="Suivi de confiance"
              description="Un interlocuteur unique, joignable, qui connaît le dossier."
            />
          </div>
        </SubBlock>

        {/* InfoCard */}
        <SubBlock title="InfoCard — clair & sombre">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              title="Salaire de l’étudiant"
              description="Payé directement par la famille via CESU, charges comprises. Aucune marge, aucun intermédiaire."
            />
            <InfoCard
              invert
              title="Forfait de gestion mensuel"
              description="Un montant fixe couvrant sélection, contrats, CESU, suivi et remplacements."
            />
          </div>
        </SubBlock>

        {/* ProfileCard */}
        <SubBlock title="ProfileCard — étudiants illustratifs">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
              meta="Infirmier en formation"
              badge="Repas · Courses"
              accent="#B0A08A"
            />
          </div>
        </SubBlock>

        {/* Checklist */}
        <SubBlock title="ChecklistItem">
          <ul className="flex flex-col gap-3">
            <ChecklistItem>
              Bénévolat, stages en établissement, expériences auprès de personnes âgées : valorisés au même titre que le diplôme.
            </ChecklistItem>
            <ChecklistItem>
              Sélection sur profil, entretien de motivation et vérification du casier judiciaire.
            </ChecklistItem>
            <ChecklistItem>
              Formation interne obligatoire avant toute première intervention.
            </ChecklistItem>
          </ul>
        </SubBlock>

        {/* Steps timeline */}
        <SubBlock title="StepsTimeline">
          <StepsTimeline
            steps={[
              { icon: Mail, title: 'Contact', description: 'Réponse sous 24h.' },
              { icon: Home, title: 'Visite domicile', description: 'Gratuite, sans engagement.' },
              { icon: Search, title: 'Mise en relation', description: '1 à 3 profils au choix.' },
              { icon: FileCheck2, title: 'Contractualisation', description: 'CESU pris en charge.' },
              { icon: CalendarCheck2, title: 'Suivi', description: 'Vérifié, mensuel.' },
            ]}
          />
        </SubBlock>

        {/* Stat card */}
        <SubBlock title="StatCard">
          <div className="max-w-md">
            <StatCard
              value="50"
              suffix="%"
              title="Crédit d’impôt famille"
              description="Sur la totalité des dépenses, salaire et forfait. Le coût réel est divisé par deux."
            />
          </div>
        </SubBlock>
      </Section>

      {/* TÉMOIGNAGES — fond deep */}
      <Section tone="deep">
        <SectionHeader
          invert
          eyebrow="Témoignages"
          title="TestimonialCard — variante sombre"
          description="À utiliser sur sections deep, comme dans le bloc Prescripteurs de la landing."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <TestimonialCard
            invert
            quote="C’est sécurisant. Le fait d’avoir un interlocuteur principal permet de lever la crainte des bénéficiaires."
            role="Médecin généraliste · Lyon 6e"
            meta="Entretien prescripteur · avril 2026"
          />
          <TestimonialCard
            invert
            quote="Orienter vers des étudiants formés et suivis, c’est une garantie que je n’avais pas avec d’autres solutions."
            role="Médecin généraliste, Lyon 3e"
            meta="Partenaire fondateur"
          />
          <TestimonialCard
            invert
            quote="La transparence sur les intervenants et le suivi proposé, ça change tout."
            role="Infirmière coordinatrice, SSIAD Lyon"
            meta="Partenaire fondatrice"
          />
        </div>

        <div className="mt-10">
          <CTABand
            invert
            title="Devenir partenaire fondateur"
            description="Le projet se construit, votre regard terrain est précieux avant le lancement."
            ctaLabel="Prendre contact"
            ctaHref="/#contact"
          />
        </div>
      </Section>

      {/* TÉMOIGNAGES — variante claire */}
      <Section tone="cream" grain>
        <SectionHeader
          eyebrow="Variante claire"
          title="TestimonialCard sur fond crème"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <TestimonialCard
            quote="Le projet répond à un vrai besoin terrain — la confiance et la régularité sont les deux piliers."
            role="Aide-soignante en SSIAD"
            meta="Entretien — mars 2026"
          />
          <TestimonialCard
            quote="Une approche qui valorise enfin le lien humain plutôt que la simple exécution de tâches."
            role="Famille bénéficiaire potentielle"
            meta="Atelier utilisateurs"
          />
        </div>

        <div className="mt-10">
          <CTABand
            title="Une question, un retour terrain"
            description="On prend le temps d’en parler avant le lancement."
            ctaLabel="Nous écrire"
            ctaHref="/#contact"
          />
        </div>
      </Section>

      {/* HALOS — démonstration */}
      <Section tone="warm">
        <Halo color="terra" position="top-right" size="lg" />
        <Halo color="sage" position="bottom-left" size="lg" />
        <SectionHeader
          eyebrow="Atmosphère"
          title={<>Des <em>halos</em> diffus pour réchauffer les sections</>}
          description="Posez `<Halo color='terra' position='top-right' />` comme premier enfant de `<Section>` — `relative overflow-hidden` est déjà géré."
        />
        <p className="mt-8 small-text">
          Couleurs disponibles : <code>terra</code>, <code>sage</code>. Positions : <code>top-right</code>, <code>top-left</code>, <code>bottom-right</code>, <code>bottom-left</code>, <code>center</code>. Tailles : <code>md</code>, <code>lg</code>, <code>xl</code>.
        </p>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*                            SUB-BLOCK                               */
/* ------------------------------------------------------------------ */

function SubBlock({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-14 first:mt-12">
      <div className="mb-5 flex flex-col gap-1 border-l-2 border-terra pl-4">
        <h3 className="font-serif text-[1.05rem] text-deep">{title}</h3>
        {hint ? <p className="text-[0.82rem] leading-snug text-mid">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}
