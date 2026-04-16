import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableau de bord admin',
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
      <p className="mt-4 text-muted-foreground">
        Stub du back-office. La navigation admin (utilisateurs, bénéficiaires, paiements,
        litiges) sera construite dans les phases ultérieures.
      </p>
    </div>
  );
}
