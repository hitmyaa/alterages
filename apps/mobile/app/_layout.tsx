import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from 'tamagui';

import { tamaguiConfig } from '@/tamagui.config';

/**
 * Layout racine de l'app Expo.
 * Providers globaux : Tamagui (theming), status bar.
 *
 * TODO: ajouter providers TanStack Query et SessionProvider Supabase une fois
 * la couche auth branchée.
 */
export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </TamaguiProvider>
  );
}
