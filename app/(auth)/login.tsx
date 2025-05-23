import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function login() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button
        title="Login Button"
        onPress={() => router.navigate("/(tabs)/inventory")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
