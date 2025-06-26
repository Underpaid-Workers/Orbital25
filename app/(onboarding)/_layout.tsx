import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function OnboardingLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="setupProfile" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
