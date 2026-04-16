import type { AlteragesSupabaseClient } from '../supabase/client';

/**
 * Couche d'abstraction API — planning.
 */

export interface PlanningEvent {
  id: string;
  beneficiary_id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  // TODO: compléter selon le schéma final
}

export async function listPlanningEvents(
  _supabase: AlteragesSupabaseClient,
  _beneficiaryId: string,
  _range: { from: string; to: string },
): Promise<PlanningEvent[]> {
  throw new Error('Not implemented: listPlanningEvents');
}

export async function createPlanningEvent(
  _supabase: AlteragesSupabaseClient,
  _event: Omit<PlanningEvent, 'id'>,
): Promise<PlanningEvent> {
  throw new Error('Not implemented: createPlanningEvent');
}
