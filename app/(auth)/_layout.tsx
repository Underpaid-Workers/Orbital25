import { useAuthContext } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Authlayout() {
  const { session } = useAuthContext();

  //If user is already authenticated, redirect to inventory screen
  if (session) {
    return <Redirect href={"/(tabs)/inventory"} />;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </SafeAreaProvider>
  );
}
