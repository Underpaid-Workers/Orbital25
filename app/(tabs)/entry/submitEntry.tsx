import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function submitEntry() {
  return (
    <View style={styles.container}>
      <Text>SubmitEntry</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
});
