import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifs',
  description: "Les formules d'abonnement Alterages.",
};

export default function TarifsPage() {
  return (
    <article className="container max-w-3xl py-16 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Tarifs</h1>
      <p className="text-muted-foreground mt-6 text-lg">
        Les formules seront détaillées ici une fois la bêta lancée. En attendant, contactez-nous
        pour discuter de votre situation.
      </p>
    </article>
  );
}
