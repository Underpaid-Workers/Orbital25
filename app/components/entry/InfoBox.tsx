import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../theme/colors";

interface info {
  title: string;
  text: string;
}

export default function InfoBox({ title, text }: info) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 15,
    borderCurve: "continuous",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  title: {
    width: "35%",
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  line: {
    height: "100%",
    width: 1,
    backgroundColor: "black",
  },
  text: {
    width: "65%",
    fontSize: 20,
    textAlign: "center",
  },
});
