import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware Next.js — protège le back-office `/admin`.
 *
 * Version stub : redirige toute tentative d'accès à `/admin` vers la page de connexion.
 * À remplacer par une vérification de session + rôle (via `@supabase/ssr`) dès que
 * l'authentification réelle sera branchée.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    // TODO: vérifier la session Supabase + le rôle admin avant de laisser passer.
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
