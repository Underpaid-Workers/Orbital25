import colors from "@/constants/Colors";
import AuthProvider from "@/providers/AuthProvider";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  //SafeAreaProvider + SafeAreaView prevents UI overflowing onto the status bar on phones.
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AuthProvider>
          <Stack initialRouteName={"(auth)"}>
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
