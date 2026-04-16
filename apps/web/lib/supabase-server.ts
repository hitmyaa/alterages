import { createSupabaseClient } from '@alterages/shared/supabase';

/**
 * Crée un client Supabase côté serveur (Server Components, Route Handlers).
 *
 * NOTE : ce client n'a pas encore la gestion des cookies Next.js — à compléter
 * quand l'auth sera branchée (via `@supabase/ssr`).
 */
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Variables Supabase manquantes : NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY doivent être définies.',
    );
  }

  return createSupabaseClient({ url, key });
}
