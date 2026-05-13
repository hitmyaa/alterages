import { createBrowserClient } from '@supabase/ssr';

/**
 * Client Supabase côté navigateur — Client Components. Lit/écrit les
 * cookies de session via `document.cookie`. Utilisé pour l'auth
 * interactive (OAuth, magic link).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
