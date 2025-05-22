import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function identifyEntry() {
  const [simulateLoading, setSimulateLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeOut = setTimeout(() => setSimulateLoading(false), 500);
    return () => clearTimeout(timeOut);
  });

  if (!simulateLoading) router.navigate("/(tabs)/entry/submitEntry");

  return (
    <View style={styles.container}>
      <Text>Identifying...</Text>
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
