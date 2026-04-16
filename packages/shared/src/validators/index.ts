import { z } from 'zod';

import { USER_ROLES } from '../types/roles';

/**
 * Schémas Zod partagés entre client et serveur.
 * Toute validation serveur (Edge Functions) DOIT réutiliser ces schémas.
 */

export const emailSchema = z.string().trim().email({ message: 'Email invalide' });

export const passwordSchema = z
  .string()
  .min(12, 'Mot de passe trop court (12 caractères minimum)')
  .max(128, 'Mot de passe trop long');

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: z.string().trim().min(2).max(120),
  role: z.enum(USER_ROLES),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Mot de passe requis'),
});

export type LoginInput = z.infer<typeof loginSchema>;
