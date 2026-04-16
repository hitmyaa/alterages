import type { AlteragesSupabaseClient } from '../supabase/client';

/**
 * Couche d'abstraction API — bénéficiaires.
 */

export interface Beneficiary {
  id: string;
  profile_id: string;
  // TODO: compléter selon le schéma final
}

/**
 * Liste les bénéficiaires associés à un aidant.
 */
export async function getBeneficiariesForCaregiver(
  _supabase: AlteragesSupabaseClient,
  _caregiverId: string,
): Promise<Beneficiary[]> {
  throw new Error('Not implemented: getBeneficiariesForCaregiver');
}

/**
 * Liste les bénéficiaires suivis par un intervenant.
 */
export async function getBeneficiariesForProfessional(
  _supabase: AlteragesSupabaseClient,
  _professionalId: string,
): Promise<Beneficiary[]> {
  throw new Error('Not implemented: getBeneficiariesForProfessional');
}
