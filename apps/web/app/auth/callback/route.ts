import { NextResponse, type NextRequest } from 'next/server';

import { createClient } from '@/lib/supabase/server';

/**
 * Callback OAuth / magic link — reçoit le `code` PKCE depuis Supabase
 * Auth, l'échange contre une session, et redirige l'utilisateur :
 *
 * - Vers `next` si fourni (override explicite via query param)
 * - Vers `/espace` si `user_metadata.onboarded === true` (compte existant)
 * - Vers `/candidature` sinon (nouveau compte → questionnaire)
 *
 * Le flag `onboarded` est positionné à la fin du tunnel `/candidature`
 * via `supabase.auth.updateUser({ data: { onboarded: true } })`.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next');
  const errorParam = searchParams.get('error');

  if (errorParam) {
    return NextResponse.redirect(`${origin}/?auth=error&reason=${encodeURIComponent(errorParam)}`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/?auth=error`);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/?auth=error&reason=${encodeURIComponent(error.message)}`,
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const onboarded = user?.user_metadata?.onboarded === true;
  const destination = next || (onboarded ? '/espace' : '/candidature');

  return NextResponse.redirect(`${origin}${destination}`);
}
