import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function home() {
  //router allows you to navigate to the (tabs) pages using router.navigate
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button
        title="Go to app page"
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
