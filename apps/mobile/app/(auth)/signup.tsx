import { H2, Paragraph, YStack } from 'tamagui';

export default function SignupScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding="$6" gap="$4">
      <H2>Inscription</H2>
      <Paragraph textAlign="center" color="$color10">
        Écran d'inscription — formulaire à implémenter.
      </Paragraph>
    </YStack>
  );
}
