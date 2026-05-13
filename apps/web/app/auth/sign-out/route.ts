import { NextResponse, type NextRequest } from 'next/server';

import { createClient } from '@/lib/supabase/server';

/**
 * Sign out — invalide la session Supabase et redirige vers la home.
 * Accepte POST (par défaut, recommandé pour éviter le sign-out par
 * navigation accidentelle) et GET (fallback pour les liens simples).
 */
async function handle(request: NextRequest) {
  const supabase = createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', request.url), { status: 302 });
}

export const POST = handle;
export const GET = handle;
