import { useAuthContext } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Authlayout() {
  const { session, isNewUser } = useAuthContext();

  //If user is already authenticated, redirect to inventory screen
  if (session) {
    if (isNewUser) {
      console.log("New user detected");
      return <Redirect href={"/(onboarding)/setupProfile"} />;
    } else {
      return <Redirect href={"/(tabs)/inventory"} />;
    }
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
