import { Link } from 'expo-router';
import { Button, H1, Paragraph, YStack } from 'tamagui';

/**
 * Écran d'accueil de l'app Expo.
 * En attendant la redirection selon le rôle utilisateur, on affiche un simple accueil.
 */
export default function IndexScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding="$6" gap="$4">
      <H1 textAlign="center">Alterages</H1>
      <Paragraph textAlign="center" color="$color10">
        Espace personnel des bénéficiaires, aidants et intervenants.
      </Paragraph>
      <Link href="/(auth)/login" asChild>
        <Button>Se connecter</Button>
      </Link>
    </YStack>
  );
}
