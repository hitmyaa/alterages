/**
 * Types générés depuis le schéma Supabase.
 *
 * Pour régénérer :
 *   pnpm supabase gen types typescript --project-id <id> > packages/shared/src/types/database.ts
 *
 * En attendant le premier schéma réel, on exporte un type minimal pour que
 * le reste du code puisse compiler.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
