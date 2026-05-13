import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contactez l'équipe Alterages.",
};

export default function ContactPage() {
  return (
    <article className="container max-w-3xl py-16 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Nous contacter</h1>
      <p className="text-muted-foreground mt-6 text-lg">
        Un formulaire de contact sera disponible ici prochainement. En attendant, vous pouvez nous
        écrire à{' '}
        <a
          href="mailto:contact@alterages.fr"
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          contact@alterages.fr
        </a>
        .
      </p>
    </article>
  );
}
