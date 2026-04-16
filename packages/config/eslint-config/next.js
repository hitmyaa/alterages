/**
 * NOTE: we don't extend ./base.js here because `next/core-web-vitals` already
 * includes the `import` plugin — extending both causes a plugin conflict.
 *
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    // Désactivé : le site est en français et utilise beaucoup d'apostrophes
    // qui sont rendues correctement par React.
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
  },
  settings: {
    next: {
      rootDir: ['apps/web/'],
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.next/',
    '.expo/',
    '.turbo/',
    '*.config.js',
    '*.config.mjs',
    '*.config.ts',
  ],
};
