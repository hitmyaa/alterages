import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: "Le projet, la vision et l'équipe derrière Alterages.",
};

export default function AProposPage() {
  return (
    <article className="container max-w-3xl py-16 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">À propos</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Alterages est une plateforme d'accompagnement pensée pour fluidifier la
        collaboration entre les personnes aidées, leurs proches et les intervenants
        professionnels qui les soutiennent au quotidien.
      </p>

      <section id="beneficiaires" className="mt-12 space-y-3">
        <h2 className="text-2xl font-semibold">Pour les bénéficiaires</h2>
        <p className="text-muted-foreground">
          Cette page est en cours de rédaction.
        </p>
      </section>

      <section id="aidants" className="mt-8 space-y-3">
        <h2 className="text-2xl font-semibold">Pour les aidants familiaux</h2>
        <p className="text-muted-foreground">
          Cette page est en cours de rédaction.
        </p>
      </section>

      <section id="intervenants" className="mt-8 space-y-3">
        <h2 className="text-2xl font-semibold">Pour les intervenants</h2>
        <p className="text-muted-foreground">
          Cette page est en cours de rédaction.
        </p>
      </section>
    </article>
  );
}
