import { Check } from 'lucide-react';
import type { Metadata } from 'next';

import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Section, SectionHeader } from '@/components/blocks';
import { TrackedLink } from '@/components/site/tracked-link';

export const metadata: Metadata = {
  title: 'Tarifs',
  description:
    "Un tarif clair, sans marge cachée. Un forfait mensuel unique de 69 € (34,50 € après crédit d'impôt) couvrant toute la gestion administrative. Premier mois découverte à 19 €.",
};

const inclusions = [
  {
    title: 'Sélection et présentation de l’intervenant',
    description: 'Étudiants du médico-social, formés et sélectionnés.',
  },
  {
    title: 'Rédaction des contrats et démarches CESU',
    description: 'Contrat de travail, déclarations URSSAF, bulletins.',
  },
  {
    title: 'Plateforme famille et bénéficiaire',
    description: 'Suivi en temps réel, historique des interventions.',
  },
  {
    title: 'Planning et remplacements',
    description: 'Gestion des imprévus, absences, congés.',
  },
  {
    title: 'Messagerie directe avec Faustine',
    description: 'Interlocutrice unique, joignable, présente.',
  },
  {
    title: 'Accès aux documents administratifs',
    description: 'Attestations fiscales, contrats, historiques.',
  },
  {
    title: 'Visite à domicile de coordination',
    description: 'Point trimestriel avec le bénéficiaire.',
  },
  {
    title: 'Accompagnement des démarches administratives',
    description: 'Aide au montage des dossiers avec la famille.',
  },
] as const;

export default function TarifsPage() {
  return (
    <>
      {/* Intro */}
      <Section tone="cream" grain>
        <SectionHeader
          eyebrow="Nos tarifs"
          title="Un tarif clair, sans marge cachée"
          description="Vous rémunérez directement l’intervenant en CESU. AlterAges facture un seul forfait mensuel qui couvre toute la gestion administrative de la relation."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_1.3fr]">
          {/* Mois découverte — fond terracotta */}
          <div className="bg-terra flex flex-col justify-center rounded-2xl px-8 py-10 text-white">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/70">
              Votre premier mois
            </span>
            <p className="mt-4 font-serif text-[2rem] leading-tight">
              Un mois découverte à <span className="font-semibold">19 €</span>
            </p>
            <p className="mt-4 text-[0.9rem] leading-[1.85] text-white/85">
              Pour tester la relation, l’intervenant et la coordination sans engagement. Vous
              décidez ensuite si vous continuez.
            </p>
          </div>

          {/* Carte principale — forfait */}
          <div className="border-bd bg-warm flex flex-col rounded-2xl border p-8 shadow-sm md:p-10">
            <span className="eyebrow">Forfait mensuel AlterAges</span>
            <h3 className="text-deep font-serif text-[1.5rem] leading-tight">
              Toute la gestion administrative, tous les mois
            </h3>
            <p className="text-mid mt-3 max-w-lg text-[0.9rem] leading-[1.85]">
              À partir du 2ᵉ mois, un forfait unique et transparent. Éligible au crédit d’impôt de
              50 % sur les services à la personne.
            </p>

            <div className="mt-7">
              <p className="text-light text-[0.85rem]">
                <span className="line-through">69 €</span> avant crédit d’impôt
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-terra font-sans text-[3rem] font-bold leading-none tracking-tight">
                  34,50 €
                </span>
                <span className="text-mid text-[0.9rem]">/ par mois, après crédit d’impôt</span>
              </p>
              <span className="bg-sage-light/25 text-sage mt-4 inline-block rounded-full px-3.5 py-1 text-[0.72rem] font-medium tracking-wide">
                50 % de crédit d’impôt appliqué
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Grille des inclusions */}
      <Section tone="warm">
        <SectionHeader eyebrow="Le détail" title="Ce qui est compris dans votre forfait" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {inclusions.map((item) => (
            <article
              key={item.title}
              className="border-bd bg-cream flex items-start gap-4 rounded-xl border px-5 py-4"
            >
              <div className="bg-sage-light/20 text-sage mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                <Check className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <h3 className="text-deep text-[0.92rem] font-medium">{item.title}</h3>
                <p className="text-mid mt-1 text-[0.83rem] leading-[1.7]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Réseau prescripteur — fond sage */}
      <section className="bg-sage px-6 py-24 text-white md:py-28">
        <div className="container grid items-center gap-8 md:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/70">
              Adressé par un professionnel du réseau
            </span>
            <h2 className="heading-serif mt-3 max-w-xl font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] text-white">
              Le forfait est offert, le premier mois
            </h2>
            <p className="mt-4 max-w-xl text-[0.92rem] leading-[1.9] text-white/85">
              Si vous êtes orienté par un médecin, un CLIC, un SSIAD, une assistante sociale ou tout
              autre professionnel partenaire d’AlterAges, votre mois découverte est gratuit.
            </p>
          </div>
          <div className="text-center md:text-right">
            <span className="font-sans text-[4rem] font-bold leading-none tracking-tight text-white">
              0 €
            </span>
          </div>
        </div>
      </section>

      {/* Deux cartes latérales */}
      <Section tone="cream" grain>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="border-bd bg-warm rounded-2xl border p-8">
            <span className="eyebrow">Le salaire de l’intervenant</span>
            <h3 className="text-deep font-serif text-[1.3rem] leading-tight">
              Réglé directement par vous
            </h3>
            <p className="text-mid mt-3 text-[0.9rem] leading-[1.85]">
              Vous êtes l’employeur, l’intervenant est votre salarié. Le paiement se fait via CESU,
              charges sociales comprises. Aucune marge n’est prélevée par AlterAges sur les heures
              effectuées.
            </p>
          </article>
          <article className="border-bd bg-warm rounded-2xl border p-8">
            <span className="eyebrow">Engagement</span>
            <h3 className="text-deep font-serif text-[1.3rem] leading-tight">3 mois minimum</h3>
            <p className="text-mid mt-3 text-[0.9rem] leading-[1.85]">
              Après le mois découverte, un engagement de 3 mois permet à la relation de s’installer
              sereinement. Ensuite, vous êtes libre chaque mois. Aucun préavis, aucune pénalité.
            </p>
          </article>
        </div>
      </Section>

      {/* FAQ tarifs */}
      <Section tone="warm">
        <SectionHeader eyebrow="Questions fréquentes" title="Ce qu’il faut savoir sur nos tarifs" />
        <div className="mt-10 max-w-3xl">
          <Accordion>
            <AccordionItem
              question="Que couvre exactement le crédit d’impôt de 50 % ?"
              groupName="faq-tarifs"
            >
              Le crédit d’impôt s’applique à la fois au salaire versé à l’intervenant (via CESU) et
              au forfait mensuel AlterAges. Sur 100 % des dépenses engagées.
            </AccordionItem>
            <AccordionItem
              question="Y a-t-il des frais cachés ou des majorations ?"
              groupName="faq-tarifs"
            >
              Non. Le forfait de 69 €/mois (avant crédit d’impôt, soit 34,50 € après) est fixe et
              couvre toute la gestion. Aucune commission sur les heures, aucune facturation
              supplémentaire pour les remplacements ou les visites.
            </AccordionItem>
            <AccordionItem
              question="Le bénéficiaire touche l’APA. Est-ce compatible ?"
              groupName="faq-tarifs"
            >
              Non, AlterAges ne peut pas intervenir auprès des bénéficiaires de l’APA. Nous
              accompagnons les personnes autonomes (GIR 5-6) qui ne bénéficient pas de cette
              allocation.
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* CTA final */}
      <section className="bg-deep px-6 py-20 text-center text-white md:py-24">
        <div className="container flex flex-col items-center">
          <TrackedLink
            href="/#contact"
            ctaLocation="tarifs_cta"
            ctaLabel="Demander un premier échange"
            className="bg-terra hover:bg-terra-dark inline-flex items-center justify-center rounded-sm px-8 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Demander un premier échange
          </TrackedLink>
          <p className="mt-4 text-[0.85rem] text-white/60">Réponse sous 24h. Sans engagement.</p>
        </div>
      </section>
    </>
  );
}
