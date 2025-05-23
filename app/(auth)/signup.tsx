import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function signup() {
  const router = useRouter();
  return (
    <View>
      <Text>signup</Text>
      <Button
        title="Login Button"
        onPress={() => router.navigate("/(tabs)/inventory")}
      />
    </View>
  );
}

const styles = StyleSheet.create({


});
