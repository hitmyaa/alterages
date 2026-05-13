import type { Metadata } from 'next';

import { EspacePagePlaceholder } from '../_components/placeholder';

export const metadata: Metadata = {
  title: 'Bénéficiaire · AlterAges',
  robots: { index: false, follow: false },
};

export default function BeneficiairePage() {
  return (
    <EspacePagePlaceholder
      pageTitle="Bénéficiaire"
      cardTitle="Bientôt les infos de votre bénéficiaire"
      cardDescription="Profil, préférences, habitudes, contacts utiles et historique des interventions — tout ce qu’il faut pour un accompagnement de qualité."
    />
  );
}
