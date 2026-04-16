import type { AdminRole, Role, UserRole } from '../types/roles';
import { isAdminRole } from '../types/roles';

/**
 * Logique de permissions en TypeScript — **miroir** des policies RLS côté base.
 *
 * Pourquoi dupliquer : les RLS protègent la base de données (source de vérité de sécurité),
 * mais on a besoin de la même logique côté client pour :
 *   1. Masquer les actions impossibles dans l'UI (meilleure UX qu'une erreur serveur).
 *   2. Tester unitairement la logique sans passer par Supabase.
 *   3. Écrire des tests adversaires qui vérifient que client et RLS sont cohérents.
 *
 * Toute divergence entre cette logique et les policies SQL est un bug.
 */

export interface PermissionContext {
  userId: string;
  roles: Role[];
}

export function hasRole(ctx: PermissionContext, role: Role): boolean {
  return ctx.roles.includes(role);
}

export function hasAnyRole(ctx: PermissionContext, roles: readonly Role[]): boolean {
  return roles.some((role) => ctx.roles.includes(role));
}

export function isAdmin(ctx: PermissionContext): boolean {
  return ctx.roles.some(isAdminRole);
}

export function isSuperadmin(ctx: PermissionContext): boolean {
  return ctx.roles.includes('superadmin');
}

/**
 * Vérifie qu'un utilisateur peut accéder au back-office admin.
 * Miroir de la policy RLS sur les tables admin.
 */
export function canAccessAdminBackoffice(ctx: PermissionContext): boolean {
  return isAdmin(ctx);
}

/**
 * Vérifie qu'un utilisateur peut accéder à l'espace personnel.
 * Miroir de la condition par défaut pour les ressources utilisateur.
 */
export function canAccessUserSpace(ctx: PermissionContext): boolean {
  const userRoles: UserRole[] = ['beneficiary', 'caregiver', 'professional'];
  return userRoles.some((role) => ctx.roles.includes(role));
}

/**
 * Vérifie qu'un admin a accès à une ressource dans un périmètre sectoriel donné.
 * TODO: implémenter la logique multi-secteurs quand elle sera définie.
 */
export function canAdminAccessSector(
  _ctx: PermissionContext,
  _sectorId: string,
  _adminRole: AdminRole,
): boolean {
  return false;
}
