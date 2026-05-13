import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Refresh la session Supabase à chaque request via le middleware Next.js.
 * Sans cet appel, les tokens expirés ne sont jamais rafraîchis et
 * l'utilisateur est déconnecté silencieusement.
 *
 * Bonus : protection des routes `/espace` et `/candidature` — redirige
 * vers la home avec `?auth=required` si l'utilisateur n'est pas connecté.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options?: CookieOptions }[],
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  /* IMPORTANT : ne rien insérer entre `createServerClient` et `getUser` —
   * cela peut casser le refresh du token côté serveur. */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtectedRoute =
    pathname.startsWith('/espace') || pathname.startsWith('/candidature');

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('auth', 'required');
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
