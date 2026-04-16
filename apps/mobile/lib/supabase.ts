import { createSupabaseClient, type AlteragesSupabaseClient } from '@alterages/shared/supabase';

let client: AlteragesSupabaseClient | undefined;

/**
 * Récupère (ou crée à la volée) le client Supabase pour l'app mobile.
 * Les variables EXPO_PUBLIC_* sont exposées au bundle client, ce qui est attendu
 * pour la clé anon.
 */
export function getSupabase(): AlteragesSupabaseClient {
  if (client) return client;

  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Variables Supabase manquantes : EXPO_PUBLIC_SUPABASE_URL et EXPO_PUBLIC_SUPABASE_ANON_KEY doivent être définies.',
    );
  }

  client = createSupabaseClient({ url, key });
  return client;
}
