import type { Config } from 'tailwindcss';

import { alteragesPreset } from '@alterages/tailwind-config';

const config: Config = {
  presets: [alteragesPreset],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
};

export default config;
