import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";

export default function AltHeaderTab({ onBack }: any) {
  return (
    <View style={styles.headerTab}>
      <TouchableOpacity style={styles.backButton} onPress={onBack()}>
        <MaterialIcons name="arrow-left" size={24} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTab: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    height: 60,
    justifyContent: "space-between",
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
