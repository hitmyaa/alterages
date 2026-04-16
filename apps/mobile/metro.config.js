// Metro configuration for Expo dans un monorepo pnpm.
// https://docs.expo.dev/guides/monorepos/

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Surveiller l'ensemble du monorepo pour le hot reload.
config.watchFolders = [workspaceRoot];

// 2. Chercher les modules dans les node_modules locaux ET à la racine.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Forcer la résolution vers une seule version de react / react-native.
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
