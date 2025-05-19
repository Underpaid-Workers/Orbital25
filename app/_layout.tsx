import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  //SafeAreaProvider + SafeAreaView prevents UI overflowing onto the status bar on phones.
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* temp fix for status bar stuff becoming white */}
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
