import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function camera() {
  return (
    <View style={styles.container}>
      <Text>camera</Text>
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
