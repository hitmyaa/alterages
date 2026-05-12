import * as React from 'react';

import { cn } from '@/lib/utils';

type Tone = 'warm' | 'cream' | 'deep';

const toneClasses: Record<Tone, string> = {
  /* #FDFAF6 — fond neutre clair, le plus reposant */
  warm: 'bg-warm',
  /* #F8F4EE — crème, légèrement plus saturé */
  cream: 'bg-cream',
  /* #3D3020 — fond sombre, texte blanc */
  deep: 'bg-deep text-white',
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Palette de fond — aligne automatiquement la couleur du texte si nécessaire. */
  tone?: Tone;
  /** Ajoute la texture grain (utile sur cream/warm). */
  grain?: boolean;
  /** Ancre HTML pour la navigation interne (#etudiants, etc.). */
  id?: string;
}

/**
 * Wrapper de section marketing — applique le fond, le padding standard
 * (`px-6 py-24 md:py-28`) et expose un `<div className="container">` pour
 * le contenu via children.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone = 'warm', grain = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'section-pad relative overflow-hidden',
          toneClasses[tone],
          grain && 'bg-grain',
          className,
        )}
        {...props}
      >
        <div className="container relative z-10">{children}</div>
      </section>
    );
  },
);
Section.displayName = 'Section';

export interface SectionHeaderProps {
  /** Petit caps au-dessus du titre. */
  eyebrow?: React.ReactNode;
  /** Titre H2 — `<em>` est colorisé terra automatiquement. */
  title: React.ReactNode;
  /** Paragraphe d'intro sous le titre. */
  description?: React.ReactNode;
  /** Centre le bloc et le contenu. */
  centered?: boolean;
  /** Pour les sections sombres : eyebrow terra-light, titre blanc. */
  invert?: boolean;
  className?: string;
  /** Largeur max du titre (défaut max-w-3xl). */
  titleMaxWidth?: string;
}

/**
 * En-tête standard d'une section : eyebrow + H2 (serif) + paragraphe lead.
 * Utilisable seul ou comme enfant direct d'un `<Section>`.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  invert = false,
  className,
  titleMaxWidth = 'max-w-3xl',
}: SectionHeaderProps) {
  return (
    <header className={cn(centered && 'text-center', className)}>
      {eyebrow ? (
        <span className={invert ? 'eyebrow-invert' : 'eyebrow'}>{eyebrow}</span>
      ) : null}
      <h2
        className={cn(
          'heading-serif h2',
          titleMaxWidth,
          centered && 'mx-auto',
          invert && 'text-white',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 max-w-2xl lead',
            centered && 'mx-auto',
            invert && 'text-white/65',
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
