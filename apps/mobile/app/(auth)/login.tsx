import { H2, Paragraph, YStack } from 'tamagui';

export default function LoginScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding="$6" gap="$4">
      <H2>Connexion</H2>
      <Paragraph textAlign="center" color="$color10">
        Écran de connexion — formulaire à implémenter.
      </Paragraph>
    </YStack>
  );
}
