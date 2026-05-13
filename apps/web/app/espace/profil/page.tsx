import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Profil · AlterAges',
  robots: { index: false, follow: false },
};

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;
const SLOTS = [
  '6h – 8h',
  '8h – 10h',
  '10h – 12h',
  '12h – 14h',
  '14h – 16h',
  '16h – 18h',
  '18h – 20h',
] as const;

const ZONE_LABELS: Record<string, string> = {
  'lyon-1': 'Lyon 1er',
  'lyon-2': 'Lyon 2e',
  'lyon-3': 'Lyon 3e',
  'lyon-4': 'Lyon 4e',
  'lyon-5': 'Lyon 5e',
  'lyon-6': 'Lyon 6e',
  'lyon-7': 'Lyon 7e',
  'lyon-8': 'Lyon 8e',
  'lyon-9': 'Lyon 9e',
  villeurbanne: 'Villeurbanne',
  caluire: 'Caluire-et-Cuire',
  bron: 'Bron',
  venissieux: 'Vénissieux',
  'saint-fons': 'Saint-Fons',
  decines: 'Décines',
  'vaulx-en-velin': 'Vaulx-en-Velin',
  oullins: 'Oullins',
  'sainte-foy': 'Sainte-Foy-lès-Lyon',
  ecully: 'Écully',
};

export default async function ProfilPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/');

  /* Fetch en parallèle — 3 requêtes indépendantes. */
  const [profileRes, availRes, zonesRes] = await Promise.all([
    supabase
      .from('student_profiles')
      .select(
        'prenom, nom, date_naissance, telephone, formation, etablissement, annee, transport_mode, availability_later',
      )
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('student_availabilities')
      .select('day_idx, slot_idx')
      .eq('profile_id', user.id),
    supabase.from('student_zones').select('zone_id').eq('profile_id', user.id),
  ]);

  const profile = profileRes.data;
  const availabilities = availRes.data ?? [];
  const zones = zonesRes.data ?? [];

  return (
    <div className="p-6 pt-20 md:p-10 md:pt-10">
      <header className="mb-8">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-light">
          Espace étudiant
        </p>
        <h1 className="heading-serif font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.15] text-deep">
          Profil
        </h1>
        <p className="mt-1 text-[0.85rem] text-mid">
          Informations renseignées lors de votre préinscription. Tout sera
          éditable depuis cette page très bientôt.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Identité */}
        <Card title="Identité">
          <Row label="Prénom" value={profile?.prenom} />
          <Row label="Nom" value={profile?.nom} />
          <Row
            label="Date de naissance"
            value={formatDate(profile?.date_naissance)}
          />
          <Row label="Téléphone" value={profile?.telephone} />
          <Row label="E-mail" value={user.email} />
        </Card>

        {/* Formation */}
        <Card title="Formation">
          <Row label="Diplôme / cursus" value={profile?.formation} />
          <Row label="Établissement" value={profile?.etablissement} />
          <Row label="Année d'étude" value={profile?.annee} />
        </Card>

        {/* Disponibilités */}
        <Card title="Disponibilités">
          {profile?.availability_later ? (
            <p className="text-[0.85rem] italic text-light">
              Vous compléterez vos disponibilités plus tard.
            </p>
          ) : availabilities.length === 0 ? (
            <p className="text-[0.85rem] italic text-light">
              Aucun créneau renseigné.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {availabilities
                .slice()
                .sort((a, b) =>
                  a.day_idx === b.day_idx
                    ? a.slot_idx - b.slot_idx
                    : a.day_idx - b.day_idx,
                )
                .map((slot) => (
                  <span
                    key={`${slot.day_idx}-${slot.slot_idx}`}
                    className="inline-flex items-center gap-1 rounded-full bg-terra/10 px-2.5 py-0.5 text-[0.74rem] text-terra"
                  >
                    {DAYS[slot.day_idx]} · {SLOTS[slot.slot_idx]}
                  </span>
                ))}
            </div>
          )}
        </Card>

        {/* Zones */}
        <Card title="Zones d'intervention">
          <div className="mb-3">
            <Row label="Mode de déplacement" value={profile?.transport_mode} />
          </div>
          {zones.length === 0 ? (
            <p className="text-[0.85rem] italic text-light">
              Aucune zone sélectionnée.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {zones.map((z) => (
                <span
                  key={z.zone_id}
                  className="inline-flex items-center gap-1 rounded-full bg-terra/10 px-2.5 py-0.5 text-[0.74rem] text-terra"
                >
                  {ZONE_LABELS[z.zone_id] ?? z.zone_id}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                            SUB                                      */
/* ------------------------------------------------------------------ */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-bd bg-white p-6">
      <h2 className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.06em] text-light">
        {title}
      </h2>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-bd-light py-1.5 last:border-b-0">
      <span className="text-[0.78rem] text-mid">{label}</span>
      <span className="text-right text-[0.85rem] font-medium text-deep">
        {value && value.trim().length > 0 ? value : (
          <span className="italic font-normal text-light">— non renseigné</span>
        )}
      </span>
    </div>
  );
}

function formatDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
