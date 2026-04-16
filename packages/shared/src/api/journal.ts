import type { AlteragesSupabaseClient } from '../supabase/client';

/**
 * Couche d'abstraction API — journal de bord.
 */

export interface JournalEntry {
  id: string;
  beneficiary_id: string;
  author_id: string;
  content: string;
  created_at: string;
  // TODO: pièces jointes, photos, visibilité
}

export async function listJournalEntries(
  _supabase: AlteragesSupabaseClient,
  _beneficiaryId: string,
): Promise<JournalEntry[]> {
  throw new Error('Not implemented: listJournalEntries');
}

export async function createJournalEntry(
  _supabase: AlteragesSupabaseClient,
  _entry: Omit<JournalEntry, 'id' | 'created_at'>,
): Promise<JournalEntry> {
  throw new Error('Not implemented: createJournalEntry');
}
