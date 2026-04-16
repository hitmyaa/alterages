/**
 * Point d'entrée principal du package @alterages/shared.
 * Les consommateurs peuvent aussi importer directement depuis les sous-chemins
 * (`@alterages/shared/api`, `@alterages/shared/supabase`, etc.) pour un tree-shaking optimal.
 */
export * from './api';
export * from './supabase';
export * from './types';
export * from './validators';
export * from './permissions';
export * from './utils';
