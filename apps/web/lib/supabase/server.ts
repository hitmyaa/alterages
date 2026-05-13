import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Client Supabase côté serveur — Server Components, Route Handlers,
 * Server Actions. Gère automatiquement les cookies de session via
 * `next/headers`.
 *
 * Dans les Server Components purs (read-only), les `setAll` peuvent
 * lever une erreur (impossible de muter les cookies depuis un RSC).
 * On les ignore silencieusement — le middleware se charge du refresh.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            /* Server Component context — refresh handled by middleware. */
          }
        },
      },
    },
  );
}
