'use server';

import { revalidatePath } from 'next/cache';

import { ALL_ZONES, TRANSPORT_OPTIONS } from '@/lib/student-options';
import { createClient } from '@/lib/supabase/server';

/* ------------------------------------------------------------------ */
/*                          PAYLOAD TYPES                              */
/* ------------------------------------------------------------------ */

export interface IdentityPayload {
  prenom: string;
  nom: string;
  dateNaissance: string;
  telephone: string;
}

export interface FormationPayload {
  formation: string;
  etablissement: string;
  annee: string;
}

export interface AvailabilityPayload {
  /** Liste de clés `${dayIdx}-${slotIdx}`. */
  slots: string[];
  later: boolean;
}

export interface ZonesPayload {
  zoneIds: string[];
  transport: string;
}

type ActionResult = { error: string } | { ok: true };

const ALLOWED_ZONE_IDS = new Set(ALL_ZONES.map((z) => z.id));
const ALLOWED_TRANSPORTS = new Set<string>([...TRANSPORT_OPTIONS, '']);

/* ------------------------------------------------------------------ */
/*                            HELPERS                                  */
/* ------------------------------------------------------------------ */

async function getAuthedUserId(): Promise<{ id: string } | { error: string }> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return { error: 'Vous devez être connecté pour modifier votre profil.' };
  return { id: user.id };
}

function trimOrNull(value: string): string | null {
  const t = value.trim();
  return t.length === 0 ? null : t;
}

/* ------------------------------------------------------------------ */
/*                            ACTIONS                                  */
/* ------------------------------------------------------------------ */

export async function updateIdentity(payload: IdentityPayload): Promise<ActionResult> {
  const auth = await getAuthedUserId();
  if ('error' in auth) return { error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('student_profiles')
    .update({
      prenom: trimOrNull(payload.prenom),
      nom: trimOrNull(payload.nom),
      date_naissance: payload.dateNaissance || null,
      telephone: trimOrNull(payload.telephone),
    })
    .eq('id', auth.id);

  if (error) return { error: `Identité : ${error.message}` };

  revalidatePath('/espace/profil');
  return { ok: true };
}

export async function updateFormation(payload: FormationPayload): Promise<ActionResult> {
  const auth = await getAuthedUserId();
  if ('error' in auth) return { error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('student_profiles')
    .update({
      formation: payload.formation || null,
      etablissement: trimOrNull(payload.etablissement),
      annee: payload.annee || null,
    })
    .eq('id', auth.id);

  if (error) return { error: `Formation : ${error.message}` };

  revalidatePath('/espace/profil');
  return { ok: true };
}

export async function updateAvailability(payload: AvailabilityPayload): Promise<ActionResult> {
  const auth = await getAuthedUserId();
  if ('error' in auth) return { error: auth.error };

  const supabase = createClient();

  /* Flag "plus tard" sur le profil. */
  const { error: profileError } = await supabase
    .from('student_profiles')
    .update({ availability_later: payload.later })
    .eq('id', auth.id);
  if (profileError) return { error: `Disponibilités : ${profileError.message}` };

  /* Remplace toutes les lignes (delete + insert). */
  const { error: delError } = await supabase
    .from('student_availabilities')
    .delete()
    .eq('profile_id', auth.id);
  if (delError) return { error: `Disponibilités : ${delError.message}` };

  if (!payload.later && payload.slots.length > 0) {
    const rows: { profile_id: string; day_idx: number; slot_idx: number }[] = [];
    for (const key of payload.slots) {
      const parts = key.split('-').map(Number);
      if (parts.length !== 2) continue;
      const [d, s] = parts as [number, number];
      if (!Number.isInteger(d) || !Number.isInteger(s) || d < 0 || d > 6 || s < 0 || s > 6) {
        continue;
      }
      rows.push({ profile_id: auth.id, day_idx: d, slot_idx: s });
    }
    if (rows.length > 0) {
      const { error: insError } = await supabase.from('student_availabilities').insert(rows);
      if (insError) return { error: `Disponibilités : ${insError.message}` };
    }
  }

  revalidatePath('/espace/profil');
  return { ok: true };
}

export async function updateZones(payload: ZonesPayload): Promise<ActionResult> {
  const auth = await getAuthedUserId();
  if ('error' in auth) return { error: auth.error };

  if (!ALLOWED_TRANSPORTS.has(payload.transport)) {
    return { error: 'Mode de déplacement invalide.' };
  }
  const zoneIds = payload.zoneIds.filter((id) => ALLOWED_ZONE_IDS.has(id));

  const supabase = createClient();

  const { error: profileError } = await supabase
    .from('student_profiles')
    .update({ transport_mode: payload.transport || null })
    .eq('id', auth.id);
  if (profileError) return { error: `Zones : ${profileError.message}` };

  const { error: delError } = await supabase
    .from('student_zones')
    .delete()
    .eq('profile_id', auth.id);
  if (delError) return { error: `Zones : ${delError.message}` };

  if (zoneIds.length > 0) {
    const rows = zoneIds.map((zone_id) => ({ profile_id: auth.id, zone_id }));
    const { error: insError } = await supabase.from('student_zones').insert(rows);
    if (insError) return { error: `Zones : ${insError.message}` };
  }

  revalidatePath('/espace/profil');
  return { ok: true };
}
