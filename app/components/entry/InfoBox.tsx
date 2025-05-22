import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../theme/colors";

interface info {
  title: string;
  text: string;
}

export default function InfoBox({ title, text }: info) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>{title}</Text>
      <View style={styles.line} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
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
  infoTitle: {
    minWidth: 128,
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
  infoText: {
    width: 280,
    fontSize: 20,
    textAlign: "center",
  },
});
