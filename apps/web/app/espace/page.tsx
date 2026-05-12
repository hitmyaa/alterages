import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Espace étudiant · AlterAges',
  description: 'Votre espace personnel AlterAges.',
  robots: { index: false, follow: false },
};

/**
 * Espace étudiant — page vide pour l'instant.
 * À terme : dashboard avec jauge de complétion du dossier, KPIs, documents
 * à fournir, formation à suivre, missions à venir, messagerie, profil.
 */
export default function EspacePage() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="eyebrow">Espace personnel</span>
        <h1 className="heading-serif h2">
          Bienvenue dans votre <em>espace</em>
        </h1>
        <p className="mt-4 lead">
          Votre préinscription est enregistrée. L'espace étudiant arrive bientôt
          — vous y retrouverez votre dossier, vos documents à fournir, votre
          formation et vos missions.
        </p>
      </div>
    </div>
  );
}
