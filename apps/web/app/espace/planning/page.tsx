import type { Metadata } from 'next';

import { EspacePagePlaceholder } from '../_components/placeholder';

export const metadata: Metadata = {
  title: 'Planning · AlterAges',
  robots: { index: false, follow: false },
};

export default function PlanningPage() {
  return (
    <EspacePagePlaceholder
      pageTitle="Planning"
      cardTitle="Bientôt votre planning"
      cardDescription="Visualisez vos missions à venir, modifiez vos disponibilités et gérez vos indisponibilités temporaires (partiels, stages...)."
    />
  );
}
