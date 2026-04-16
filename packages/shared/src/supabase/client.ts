import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '../types/database';

/**
 * Type du client Supabase typé avec notre schéma de base de données.
 */
export type AlteragesSupabaseClient = SupabaseClient<Database>;

export interface CreateSupabaseClientOptions {
  /** URL du projet Supabase */
  url: string;
  /** Clé publique (anon) ou service role selon le contexte */
  key: string;
  /**
   * Fournir une session à réhydrater côté serveur (cookies Next.js).
   * Non requis côté client, utile pour les Server Components.
   */
  accessToken?: string;
}

/**
 * Factory réutilisable pour créer un client Supabase typé.
 * - Côté client web/mobile : appelée une fois avec la clé anon publique.
 * - Côté Edge Function / serveur : peut être appelée avec la service role key.
 * - Pour les Server Components Next.js : passer `accessToken` pour propager la session.
 *
 * NE PAS appeler directement depuis un composant : passer par la couche API dans
 * `@alterages/shared/api`.
 */
export function createSupabaseClient(
  options: CreateSupabaseClientOptions,
): AlteragesSupabaseClient {
  const { url, key, accessToken } = options;

  return createClient<Database>(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: accessToken
      ? {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      : undefined,
  });
}
