import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "./theme/colors";

export default function RootLayout() {
  //SafeAreaProvider + SafeAreaView prevents UI overflowing onto the status bar on phones.
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
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
