'use client';

import { Loader2, Pencil } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Coque partagée pour les sections éditables du profil étudiant.
 *
 * Deux modes :
 *  - VIEW : affiche `children` (rendu read-only) + bouton "Modifier" en haut à droite
 *  - EDIT : affiche `renderEditor` + barre d'actions Annuler / Enregistrer
 *
 * La logique de sauvegarde (`onSave`) est passée par le parent ; cette coque
 * gère uniquement la transition d'état et l'affichage des feedbacks.
 */
export interface SectionCardProps {
  title: string;
  /** Vue read-only (état initial). */
  children: React.ReactNode;
  /** Rendu du formulaire en mode édition. */
  renderEditor: () => React.ReactNode;
  /** Appelé au clic sur Enregistrer. Retourner un objet `error` ou `ok: true`. */
  onSave: () => Promise<{ error: string } | { ok: true }>;
  /** Appelé à l'entrée en mode édition pour réinitialiser le state local. */
  onEnterEdit?: () => void;
  /** Bloque la sauvegarde si false (ex : champ requis vide). */
  canSave?: boolean;
  className?: string;
}

export function SectionCard({
  title,
  children,
  renderEditor,
  onSave,
  onEnterEdit,
  canSave = true,
  className,
}: SectionCardProps) {
  const [editing, setEditing] = React.useState(false);
  const [pending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const enter = () => {
    setError(null);
    onEnterEdit?.();
    setEditing(true);
  };

  const cancel = () => {
    setError(null);
    setEditing(false);
  };

  const save = () => {
    setError(null);
    startTransition(async () => {
      const result = await onSave();
      if ('error' in result) {
        setError(result.error);
        return;
      }
      setEditing(false);
    });
  };

  return (
    <section className={cn('border-bd rounded-xl border bg-white p-6', className)}>
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-light text-[0.72rem] font-medium uppercase tracking-[0.06em]">
          {title}
        </h2>
        {!editing ? (
          <button
            type="button"
            onClick={enter}
            className="text-mid hover:text-terra inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.74rem] font-medium transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden />
            Modifier
          </button>
        ) : null}
      </header>

      {editing ? renderEditor() : <div className="flex flex-col gap-2">{children}</div>}

      {editing ? (
        <div className="border-bd-light mt-5 flex flex-col gap-3 border-t pt-4">
          {error ? (
            <p className="text-destructive text-[0.78rem]" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={cancel}
              disabled={pending}
              className="text-mid hover:text-deep rounded-md px-3 py-2 text-[0.82rem] font-medium transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={save}
              disabled={pending || !canSave}
              className="bg-terra hover:bg-terra-dark inline-flex items-center gap-2 rounded-md px-4 py-2 text-[0.82rem] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : null}
              Enregistrer
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*                          ROW (read-only)                            */
/* ------------------------------------------------------------------ */

export function Row({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="border-bd-light flex items-baseline justify-between gap-4 border-b py-1.5 last:border-b-0">
      <span className="text-mid text-[0.78rem]">{label}</span>
      <span className="text-deep text-right text-[0.85rem] font-medium">
        {value && value.trim().length > 0 ? (
          value
        ) : (
          <span className="text-light font-normal italic">— non renseigné</span>
        )}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                              FIELD                                  */
/* ------------------------------------------------------------------ */

export function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-mid text-[0.72rem] font-medium uppercase tracking-[0.06em]">
        {label}
      </span>
      {children}
      {error ? <span className="text-destructive text-[0.74rem]">{error}</span> : null}
    </label>
  );
}
