import type { AlteragesSupabaseClient } from '../supabase/client';

/**
 * Couche d'abstraction API — utilisateurs.
 *
 * Règle absolue : aucun composant ni écran ne doit appeler `supabase.from()` directement.
 * Toutes les lectures/écritures passent par ces fonctions.
 */

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

/**
 * Récupère le profil de l'utilisateur connecté.
 * TODO: à implémenter une fois la table `profiles` créée via migration.
 */
export async function getCurrentProfile(
  _supabase: AlteragesSupabaseClient,
): Promise<Profile | null> {
  throw new Error('Not implemented: getCurrentProfile');
}

/**
 * Met à jour le profil de l'utilisateur connecté.
 */
export async function updateCurrentProfile(
  _supabase: AlteragesSupabaseClient,
  _patch: Partial<Pick<Profile, 'full_name' | 'avatar_url'>>,
): Promise<Profile> {
  throw new Error('Not implemented: updateCurrentProfile');
}
