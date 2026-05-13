'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

/* ------------------------------------------------------------------ */
/*                       PAYLOAD TYPES                                 */
/* ------------------------------------------------------------------ */

export interface SubmitQuestionnairePayload {
  identity: {
    prenom: string;
    nom: string;
    dateNaissance: string;
    telephone: string;
    formation: string;
    etablissement: string;
    annee: string;
  };
  /** Liste de clés `${dayIdx}-${slotIdx}`. */
  availability: string[];
  availabilityLater: boolean;
  /** Liste d'identifiants de zones (cf. step-zones.tsx). */
  zones: string[];
  transport: string;
}

/* ------------------------------------------------------------------ */
/*                       SERVER ACTION                                 */
/* ------------------------------------------------------------------ */

/**
 * Persiste les réponses du questionnaire dans Supabase :
 *   - upsert dans `student_profiles`
 *   - delete + insert dans `student_availabilities`
 *   - delete + insert dans `student_zones`
 *   - flag `auth.users.user_metadata.onboarded = true`
 *
 * Redirige vers `/espace` en cas de succès. En cas d'erreur, renvoie un
 * objet `{ error }` que le client peut afficher.
 */
export async function submitQuestionnaire(
  payload: SubmitQuestionnairePayload,
): Promise<{ error: string } | void> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'Vous devez être connecté pour soumettre le questionnaire.' };
  }

  /* --- 1. Upsert profile -------------------------------------------------- */
  const profilePayload = {
    id: user.id,
    prenom: payload.identity.prenom.trim() || null,
    nom: payload.identity.nom.trim() || null,
    date_naissance: payload.identity.dateNaissance || null,
    telephone: payload.identity.telephone.trim() || null,
    formation: payload.identity.formation || null,
    etablissement: payload.identity.etablissement.trim() || null,
    annee: payload.identity.annee || null,
    transport_mode: payload.transport || null,
    availability_later: payload.availabilityLater,
    onboarded: true,
  };

  const { error: profileError } = await supabase
    .from('student_profiles')
    .upsert(profilePayload, { onConflict: 'id' });

  if (profileError) {
    return { error: `Profil : ${profileError.message}` };
  }

  /* --- 2. Replace availabilities (delete + insert) ------------------------ */
  await supabase.from('student_availabilities').delete().eq('profile_id', user.id);

  if (!payload.availabilityLater && payload.availability.length > 0) {
    const rows: { profile_id: string; day_idx: number; slot_idx: number }[] = [];
    for (const key of payload.availability) {
      const parts = key.split('-').map(Number);
      if (parts.length !== 2) continue;
      const [d, s] = parts as [number, number];
      if (!Number.isInteger(d) || !Number.isInteger(s) || d < 0 || d > 6 || s < 0 || s > 6) {
        continue;
      }
      rows.push({ profile_id: user.id, day_idx: d, slot_idx: s });
    }

    if (rows.length > 0) {
      const { error: availError } = await supabase.from('student_availabilities').insert(rows);
      if (availError) {
        return { error: `Disponibilités : ${availError.message}` };
      }
    }
  }

  /* --- 3. Replace zones --------------------------------------------------- */
  await supabase.from('student_zones').delete().eq('profile_id', user.id);

  if (payload.zones.length > 0) {
    const rows = payload.zones.map((zone_id) => ({
      profile_id: user.id,
      zone_id,
    }));
    const { error: zonesError } = await supabase.from('student_zones').insert(rows);
    if (zonesError) {
      return { error: `Zones : ${zonesError.message}` };
    }
  }

  /* --- 4. Flag user metadata --------------------------------------------- */
  await supabase.auth.updateUser({ data: { onboarded: true } });

  redirect('/espace');
}
