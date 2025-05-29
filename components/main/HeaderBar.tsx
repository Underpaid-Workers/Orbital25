import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//Header icon components used for header tab

export default function HeaderBar({ navigation }: BottomTabHeaderProps) {
  return (
    <View style={styles.headerTab}>
      <Text style={styles.headerText}>EcoDex</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.headerIcon}
          // temp onPress logic
          onPress={() => console.log("Search pressed")}
        >
          <MaterialCommunityIcons name="magnify" size={28} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <MaterialCommunityIcons
            name="cog"
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
    height: 50,
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
