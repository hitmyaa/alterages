import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { AvailabilitySection } from './_components/availability-section';
import { FormationSection } from './_components/formation-section';
import { IdentitySection } from './_components/identity-section';
import { ZonesSection } from './_components/zones-section';

export const metadata: Metadata = {
  title: 'Profil · AlterAges',
  robots: { index: false, follow: false },
};

export default async function ProfilPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/');

  const [profileRes, availRes, zonesRes] = await Promise.all([
    supabase
      .from('student_profiles')
      .select(
        'prenom, nom, date_naissance, telephone, formation, etablissement, annee, transport_mode, availability_later',
      )
      .eq('id', user.id)
      .maybeSingle(),
    supabase.from('student_availabilities').select('day_idx, slot_idx').eq('profile_id', user.id),
    supabase.from('student_zones').select('zone_id').eq('profile_id', user.id),
  ]);

  const profile = profileRes.data;
  const availabilities = availRes.data ?? [];
  const zones = zonesRes.data ?? [];

  return (
    <div className="p-6 pt-20 md:p-10 md:pt-10">
      <header className="mb-8">
        <p className="text-light text-[0.72rem] font-medium uppercase tracking-[0.1em]">
          Espace étudiant
        </p>
        <h1 className="heading-serif text-deep font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.15]">
          Profil
        </h1>
        <p className="text-mid mt-1 text-[0.85rem]">
          Modifiez chaque section indépendamment. Les choix proposés sont les mêmes que lors de
          votre préinscription.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <IdentitySection
          initial={{
            prenom: profile?.prenom ?? '',
            nom: profile?.nom ?? '',
            dateNaissance: profile?.date_naissance ?? '',
            telephone: profile?.telephone ?? '',
            email: user.email,
          }}
        />

        <FormationSection
          initial={{
            formation: profile?.formation ?? '',
            etablissement: profile?.etablissement ?? '',
            annee: profile?.annee ?? '',
          }}
        />

        <AvailabilitySection
          initial={{
            later: profile?.availability_later ?? false,
            slots: availabilities,
          }}
        />

        <ZonesSection
          initial={{
            transport: profile?.transport_mode ?? '',
            zoneIds: zones.map((z) => z.zone_id),
          }}
        />
      </div>
    </div>
  );
}
