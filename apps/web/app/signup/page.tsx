import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Créer un compte',
};

export default function SignupPage() {
  return (
    <div className="container flex min-h-screen max-w-md flex-col items-center justify-center gap-6 py-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Créer un compte</h1>
      <p className="text-muted-foreground">
        L'inscription ouvrira avec la bêta. Laissez-nous vos coordonnées via la page
        contact pour être prévenu·e.
      </p>
      <Button asChild>
        <Link href="/contact">Demander un accès</Link>
      </Button>
    </div>
  );
}
