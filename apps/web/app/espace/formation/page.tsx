import type { Metadata } from 'next';

import { EspacePagePlaceholder } from '../_components/placeholder';

export const metadata: Metadata = {
  title: 'Ma formation · AlterAges',
  robots: { index: false, follow: false },
};

export default function FormationPage() {
  return (
    <EspacePagePlaceholder
      pageTitle="Ma formation"
      cardTitle="Bientôt votre parcours de formation"
      cardDescription="Modules en ligne, progression, QCM de validation et attestation téléchargeable. Tout votre apprentissage à votre rythme."
    />
  );
}
