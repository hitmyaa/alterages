/**
 * Utilitaires génériques cross-platform.
 */

/**
 * Formatte une date ISO en chaîne localisée française courte.
 */
export function formatDateFR(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Returns a typed "never" for exhaustive switch checks.
 */
export function assertNever(value: never, message = 'Unhandled case'): never {
  throw new Error(`${message}: ${String(value)}`);
}

/**
 * Tronque une chaîne à `max` caractères en ajoutant des points de suspension.
 */
export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, Math.max(0, max - 1)).trimEnd() + '…';
}
