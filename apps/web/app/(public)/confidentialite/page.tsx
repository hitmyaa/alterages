import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
};

export default function ConfidentialitePage() {
  return (
    <article className="container max-w-3xl py-16 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Politique de confidentialité
      </h1>
      <p className="mt-6 text-muted-foreground">
        Page en cours de rédaction. La politique de confidentialité complète (RGPD) sera
        publiée avant le lancement de la plateforme.
      </p>
    </article>
  );
}
