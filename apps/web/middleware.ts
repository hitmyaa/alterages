import { type NextRequest } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

/**
 * Middleware Next.js — refresh la session Supabase à chaque request et
 * protège les routes authentifiées (`/espace`, `/candidature`).
 *
 * Le matcher exclut les assets statiques et les routes publiques pour
 * éviter un appel Supabase inutile sur chaque image.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match toutes les requêtes sauf :
     * - _next/static (assets statiques)
     * - _next/image (optimisation images)
     * - favicon, icons, images publiques
     * - api/contact (formulaire public)
     * - auth/* (routes d'authentification — gérées séparément)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api/contact|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
