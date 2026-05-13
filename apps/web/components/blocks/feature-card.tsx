import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  title: string;
  description: string;
  /** Source d'image (mode `image`) — fait office de fond. */
  image?: string;
  imageAlt?: string;
  /** Icône Lucide (mode `icon`) — affichée dans un pavé warm en haut. */
  icon?: LucideIcon;
  /** Hauteur minimale en mode image. */
  minHeight?: string;
  className?: string;
}

/**
 * Carte de feature/atout.
 *
 * - Mode `image` (props `image` + `imageAlt`) : image plein cadre avec
 *   dégradé sombre, texte blanc en bas. Pensée pour fond sombre.
 * - Mode `icon` (props `icon`) : pavé warm avec icône terra, titre serif
 *   + description. Pensée pour fond clair.
 */
export function FeatureCard({
  title,
  description,
  image,
  imageAlt,
  icon: Icon,
  minHeight = '260px',
  className,
}: FeatureCardProps) {
  if (image) {
    return (
      <article
        className={cn(
          'group relative flex flex-col justify-end overflow-hidden rounded-xl border border-white/10 transition-transform hover:-translate-y-1',
          className,
        )}
        style={{ minHeight }}
      >
        <Image
          src={image}
          alt={imageAlt ?? ''}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(30,20,10,0.92) 40%, rgba(30,20,10,0.55) 100%)',
          }}
        />
        <div className="relative p-6">
          <h3 className="font-serif text-lg text-white">{title}</h3>
          <p className="mt-2 text-[0.85rem] leading-[1.75] text-white/75">
            {description}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'group rounded-xl border border-bd bg-warm p-6 transition-all hover:-translate-y-1 hover:border-terra hover:shadow-soft',
        className,
      )}
    >
      {Icon ? (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-terra/10 text-terra">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      ) : null}
      <h3 className="font-serif text-lg text-deep">{title}</h3>
      <p className="mt-2 text-[0.88rem] leading-[1.75] text-mid">{description}</p>
    </article>
  );
}
