import type { Metadata } from 'next';

import { EspacePagePlaceholder } from '../_components/placeholder';

export const metadata: Metadata = {
  title: 'Gains et bulletins · AlterAges',
  robots: { index: false, follow: false },
};

export default function GainsPage() {
  return (
    <EspacePagePlaceholder
      pageTitle="Gains et bulletins"
      cardTitle="Bientôt vos gains et bulletins"
      cardDescription="Récapitulatif mensuel de vos heures et de votre rémunération, bulletins de salaire CESU téléchargeables, attestations annuelles."
    />
  );
}
