/**
 * Options partagées entre le parcours d'onboarding (`/candidature`) et la
 * page profil de l'espace étudiant (`/espace/profil`). Source unique pour
 * que les deux écrans présentent exactement les mêmes choix.
 */

/* ------------------------------------------------------------------ */
/*                          FORMATION                                  */
/* ------------------------------------------------------------------ */

export const FORMATION_GROUPS: ReadonlyArray<{
  label: string;
  options: ReadonlyArray<string>;
}> = [
  {
    label: 'Santé et paramédical',
    options: [
      'Infirmier(ère), IFSI',
      'Aide-soignant(e), IFAS',
      'Médecine',
      'Pharmacie',
      'Kiné / Ergothérapeute / Orthophoniste',
      'Sage-femme',
    ],
  },
  {
    label: 'Social et humain',
    options: ['Travail social (DEASS, DEES, DECESF...)', 'Psychologie', 'Éducation spécialisée'],
  },
  { label: 'Sport', options: ['STAPS'] },
  {
    label: 'Autre',
    options: ['Autre formation universitaire', 'Autre formation en alternance'],
  },
];

export const ANNEES_OPTIONS = [
  '1ère année',
  '2ème année',
  '3ème année',
  '4ème année',
  '5ème année ou plus',
] as const;

/* ------------------------------------------------------------------ */
/*                          DISPONIBILITÉS                             */
/* ------------------------------------------------------------------ */

export const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;

/** Créneaux de 2h entre 6h et 20h (7 créneaux). */
export const SLOTS: ReadonlyArray<{ label: string }> = [
  { label: '6h – 8h' },
  { label: '8h – 10h' },
  { label: '10h – 12h' },
  { label: '12h – 14h' },
  { label: '14h – 16h' },
  { label: '16h – 18h' },
  { label: '18h – 20h' },
];

/* ------------------------------------------------------------------ */
/*                              ZONES                                  */
/* ------------------------------------------------------------------ */

export interface Zone {
  id: string;
  label: string;
}

export const ARRONDISSEMENTS: ReadonlyArray<Zone> = [
  { id: 'lyon-1', label: 'Lyon 1er' },
  { id: 'lyon-2', label: 'Lyon 2e' },
  { id: 'lyon-3', label: 'Lyon 3e' },
  { id: 'lyon-4', label: 'Lyon 4e' },
  { id: 'lyon-5', label: 'Lyon 5e' },
  { id: 'lyon-6', label: 'Lyon 6e' },
  { id: 'lyon-7', label: 'Lyon 7e' },
  { id: 'lyon-8', label: 'Lyon 8e' },
  { id: 'lyon-9', label: 'Lyon 9e' },
];

export const COMMUNES: ReadonlyArray<Zone> = [
  { id: 'villeurbanne', label: 'Villeurbanne' },
  { id: 'caluire', label: 'Caluire-et-Cuire' },
  { id: 'bron', label: 'Bron' },
  { id: 'venissieux', label: 'Vénissieux' },
  { id: 'saint-fons', label: 'Saint-Fons' },
  { id: 'decines', label: 'Décines' },
  { id: 'vaulx-en-velin', label: 'Vaulx-en-Velin' },
  { id: 'oullins', label: 'Oullins' },
  { id: 'sainte-foy', label: 'Sainte-Foy-lès-Lyon' },
  { id: 'ecully', label: 'Écully' },
];

export const ALL_ZONES: ReadonlyArray<Zone> = [...ARRONDISSEMENTS, ...COMMUNES];

export const ZONE_LABEL_BY_ID: Record<string, string> = Object.fromEntries(
  ALL_ZONES.map((z) => [z.id, z.label]),
);

/* ------------------------------------------------------------------ */
/*                            TRANSPORT                                */
/* ------------------------------------------------------------------ */

export const TRANSPORT_OPTIONS = [
  'Transports en commun',
  'Vélo / trottinette',
  'Voiture personnelle',
  'Plusieurs modes',
] as const;
