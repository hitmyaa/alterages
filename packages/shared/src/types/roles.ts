/**
 * Rôles utilisateurs et admins.
 * Un utilisateur peut avoir plusieurs rôles simultanément (ex. aidant + bénéficiaire).
 */

export const USER_ROLES = ['beneficiary', 'caregiver', 'professional'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ADMIN_ROLES = ['superadmin', 'admin_secteur', 'support'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export type Role = UserRole | AdminRole;

export function isUserRole(value: string): value is UserRole {
  return (USER_ROLES as readonly string[]).includes(value);
}

export function isAdminRole(value: string): value is AdminRole {
  return (ADMIN_ROLES as readonly string[]).includes(value);
}
