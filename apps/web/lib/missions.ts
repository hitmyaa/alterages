export type Mission = {
  title: string;
  description: string;
  /** Image de fond de la tuile. Absente → un placeholder "Image à venir" s'affiche. */
  image?: string;
  imageAlt?: string;
};

/**
 * Missions AlterAges — source unique partagée entre la page étudiants
 * ("Ce que vous ferez concrètement") et la landing ("Ce que fait AlterAges,
 * concrètement"). Mêmes visuels et mêmes textes des deux côtés.
 */
export const missions: Mission[] = [
  {
    title: 'Entretien du domicile',
    description:
      'Ménage courant et rangement. Vous aidez le bénéficiaire à maintenir un cadre de vie propre et agréable, selon ses habitudes et ses préférences.',
    image: '/images/etudiants/mission-entretien.webp',
    imageAlt: 'Étudiante AlterAges aidant une personne âgée à entretenir son domicile',
  },
  {
    title: 'Préparation des repas',
    description:
      'Préparation de repas simples selon les goûts et régimes du bénéficiaire. Aide à la prise des repas si nécessaire. Un moment de partage autant qu’une aide concrète.',
    image: '/images/etudiants/mission-repas.webp',
    imageAlt: 'Étudiante AlterAges préparant un repas avec une personne âgée',
  },
  {
    title: 'Accompagnement numérique',
    description:
      "Aide à l'utilisation du smartphone, de la tablette et des services en ligne. Vidéo avec les proches, démarches administratives, photos : des besoins simples mais essentiels.",
    image: '/images/etudiants/mission-numerique.webp',
    imageAlt: 'Étudiante AlterAges aidant une personne âgée à utiliser une tablette',
  },
  {
    title: 'Aide à la mobilité extérieure',
    description:
      "Accompagnement pour les sorties, les courses, les promenades et les rendez-vous du quotidien. Vous permettez à des personnes qui ne sortent parfois plus seules de garder un lien avec l'extérieur, dans un cadre non médicalisé.",
    image: '/images/etudiants/mission-mobilite.webp',
    imageAlt: 'Étudiante AlterAges accompagnant une personne âgée lors d’une sortie',
  },
  {
    title: 'Assistance administrative',
    description:
      'Aide au montage des dossiers, préparation des attestations, orientation vers les aides existantes. Vous accompagnez le bénéficiaire dans les démarches administratives du quotidien.',
    image: '/images/etudiants/mission-administratif.png',
    imageAlt: 'Étudiant AlterAges aidant une personne âgée dans ses démarches administratives',
  },
];
