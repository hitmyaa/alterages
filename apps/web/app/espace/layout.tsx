import { redirect } from 'next/navigation';

import { EspaceAnalytics } from '@/components/espace/analytics';
import { EspaceSidebar, type SidebarUser } from '@/components/espace/sidebar';
import { createClient } from '@/lib/supabase/server';

/**
 * Layout de l'espace étudiant — sidebar gauche persistante + main content.
 *
 * Server component : récupère l'utilisateur connecté + son profil depuis
 * Supabase pour les passer au composant Sidebar (client). Si l'utilisateur
 * n'est pas connecté, le middleware s'en occupe déjà — la redirect ici
 * est un filet de sécurité.
 */
export default async function EspaceLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  /* Le profile peut être null si la migration n'a pas tourné (trigger
   * auto-create absent). On tombe sur les fallbacks issus de l'auth. */
  const { data: profile } = await supabase
    .from('student_profiles')
    .select('prenom, nom')
    .eq('id', user.id)
    .maybeSingle();

  const sidebarUser = buildSidebarUser(user, profile);

  return (
    <div className="bg-cream min-h-screen">
      <EspaceAnalytics />
      <EspaceSidebar user={sidebarUser} />
      <main className="min-h-screen md:pl-64">{children}</main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                           HELPERS                                   */
/* ------------------------------------------------------------------ */

interface AuthUser {
  email?: string;
  user_metadata?: Record<string, unknown>;
}

interface ProfileSlice {
  prenom: string | null;
  nom: string | null;
}

function buildSidebarUser(user: AuthUser, profile: ProfileSlice | null): SidebarUser {
  const prenom = profile?.prenom?.trim() ?? '';
  const nom = profile?.nom?.trim() ?? '';
  const email = user.email ?? '';
  const fullName = user.user_metadata?.full_name as string | undefined;

  const name = prenom && nom ? `${prenom} ${nom}` : fullName || email || 'Étudiant';

  const initials =
    prenom && nom
      ? `${prenom[0]}${nom[0]}`.toUpperCase()
      : (fullName?.[0] || email?.[0] || 'É').toUpperCase();

  return { name, email, initials };
}
