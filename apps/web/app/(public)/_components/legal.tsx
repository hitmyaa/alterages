import type { ReactNode } from 'react';

/**
 * Gabarit commun aux pages légales (mentions légales, confidentialité, CGU).
 * Reprend les tokens du design system (fond warm, titres serif) pour rester
 * cohérent avec le reste du site tout en gardant une lecture confortable.
 */
export function LegalLayout({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-warm">
      <div className="container max-w-3xl px-6 py-16 md:py-24">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="heading-serif text-deep font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
          {title}
        </h1>
        {intro ? <p className="lead text-mid mt-6">{intro}</p> : null}
        <div className="mt-10 flex flex-col gap-10">{children}</div>
        {updated ? (
          <p className="text-light border-bd mt-12 border-t pt-6 text-[0.8rem]">
            Dernière mise à jour : {updated}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-deep font-serif text-[1.25rem] leading-tight">{title}</h2>
      <div className="text-mid mt-3 space-y-3 text-[0.9rem] leading-[1.85]">{children}</div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5">{children}</ul>;
}
