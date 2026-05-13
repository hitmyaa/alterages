import type { Metadata } from 'next';

import { EspacePagePlaceholder } from '../_components/placeholder';

export const metadata: Metadata = {
  title: 'Paramètres · AlterAges',
  robots: { index: false, follow: false },
};

export default function ParametresPage() {
  return (
    <EspacePagePlaceholder
      pageTitle="Paramètres"
      cardTitle="Bientôt vos paramètres"
      cardDescription="Notifications, préférences de contact, sécurité du compte, RIB pour paiements CESU, suppression du compte."
    />
  );
}
