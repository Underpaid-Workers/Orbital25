import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function AnimalTag() {
  return (
    <View style={styles.tag}>
      <Image
        source={require("../../../assets/images/animal.png")}
        style={styles.icon}
        />
      <Text style={styles.text}>Animal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D2D0A0", 
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 11,
    color: "#000",
  },
});