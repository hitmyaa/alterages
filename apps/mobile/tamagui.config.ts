import { config as baseConfig } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

/**
 * Configuration Tamagui — on part du preset `@tamagui/config/v3` par défaut.
 * À personnaliser (tokens de couleur Alterages, thèmes clair/sombre) quand le
 * design system sera défini.
 */
export const tamaguiConfig = createTamagui(baseConfig);

export default tamaguiConfig;

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}
