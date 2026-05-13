import type { Metadata } from 'next';

import { EspacePagePlaceholder } from './_components/placeholder';

export const metadata: Metadata = {
  title: 'Tableau de bord · AlterAges',
  description: 'Votre espace personnel AlterAges.',
  robots: { index: false, follow: false },
};

export default function EspaceDashboardPage() {
  return (
    <EspacePagePlaceholder
      pageTitle="Tableau de bord"
      cardTitle="Bientôt votre tableau de bord"
      cardDescription="Jauge de complétion de votre dossier, missions à venir, gains du mois, état de la formation : tout sera regroupé ici."
    />
  );
}
