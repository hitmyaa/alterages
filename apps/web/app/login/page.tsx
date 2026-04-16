import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Se connecter',
};

export default function LoginPage() {
  return (
    <div className="container flex min-h-screen max-w-md flex-col items-center justify-center gap-6 py-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Se connecter</h1>
      <p className="text-muted-foreground">
        L'authentification sera disponible prochainement. Revenez bientôt.
      </p>
      <Button variant="outline" asChild>
        <Link href="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
}
