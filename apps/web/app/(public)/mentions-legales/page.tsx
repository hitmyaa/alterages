import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
};

export default function MentionsLegalesPage() {
  return (
    <article className="container max-w-3xl py-16 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Mentions légales</h1>
      <p className="text-muted-foreground mt-6">
        Page en cours de rédaction. Les mentions légales complètes seront publiées avant le
        lancement de la plateforme.
      </p>
    </article>
  );
}
