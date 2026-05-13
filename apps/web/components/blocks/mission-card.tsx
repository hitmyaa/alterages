import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { PlaceholderImage } from './placeholder-image';

export interface MissionCardProps {
  /** Titre court de la mission. */
  title: string;
  /** Description complète, révélée au survol. */
  description: string;
  /** Source d'image en arrière-plan. Si absente, un placeholder s'affiche. */
  image?: string;
  imageAlt?: string;
  /** Avertissement optionnel (ex: "Formation obligatoire avant cette mission."). */
  warning?: string;
  className?: string;
}

/**
 * Tuile de mission étudiante. Pattern :
 *   - Au repos : image en fond + dégradé sombre + titre serif en bas.
 *   - Au survol : l'image se floute, un panneau deep prend la place,
 *     révélant la description complète et un éventuel avertissement.
 *
 * Pas d'icône (volontairement épuré, contrairement aux FeatureCard).
 * Ratio fixe 4/3 pour une grille homogène.
 */
export function MissionCard({
  title,
  description,
  image,
  imageAlt,
  warning,
  className,
}: MissionCardProps) {
  return (
    <article
      className={cn(
        'bg-deep group relative aspect-[4/3] cursor-default overflow-hidden rounded-xl',
        className,
      )}
    >
      {/* Fond — image fournie ou placeholder */}
      {image ? (
        <Image
          src={image}
          alt={imageAlt ?? ''}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-30 group-hover:blur-[2px]"
        />
      ) : (
        <PlaceholderImage
          invert
          label="Image à venir"
          className="bg-deep/60 absolute inset-0 rounded-none border-0 transition-opacity duration-300 group-hover:opacity-0"
        />
      )}

      {/* Dégradé sombre — assure la lisibilité du titre au repos */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
        style={{
          background: 'linear-gradient(to top, rgba(42,34,24,0.92) 40%, rgba(42,34,24,0.3) 100%)',
        }}
      />

      {/* État repos : titre seul, ancré en bas */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="font-serif text-[1.05rem] text-white">{title}</h3>
      </div>

      {/* État survol : panneau deep avec description */}
      <div className="bg-deep pointer-events-none absolute inset-0 flex flex-col justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="font-serif text-[1.05rem] text-white">{title}</h3>
        <p className="mt-3 text-[0.85rem] leading-[1.8] text-white/70">{description}</p>
        {warning ? (
          <div className="mt-4 border-t border-white/10 pt-3 text-[0.74rem] italic text-white/40">
            {warning}
          </div>
        ) : null}
      </div>
    </article>
  );
}
