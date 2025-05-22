import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";

//Header icon components used for header tab

export default function HeaderBar({
  layout,
  options,
  route,
  navigation,
}: BottomTabHeaderProps) {
  return (
    <View style={styles.headerTab}>
      <Text style={styles.headerText}>EcoDex</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.headerIcon}
          // temp onPress logic
          onPress={() => console.log("Search pressed")}
        >
          <MaterialIcons name="search" size={28} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <MaterialIcons
            name="settings"
            size={28}
            onPress={() => navigation.navigate("settings")}
          />
        </TouchableOpacity>
      </View>
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
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcon: {
    marginHorizontal: 6,
  },
});
