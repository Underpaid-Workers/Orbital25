import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderBar({
  headerProps,
  username,
}: {
  headerProps: BottomTabHeaderProps;
  username: string;
}) {
  return (
    <View style={styles.headerTab}>
      <Text style={styles.headerText}>EcoDex</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.usernameText}>{username}</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <MaterialCommunityIcons
            name="cog"
            size={28}
            onPress={() => headerProps.navigation.navigate("settings")}
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
    fontSize: 21,
    color: colors.text,
    fontWeight: "bold",
  },
  usernameText: {
    fontSize: 18,
    textAlignVertical: "center",
    color: colors.text,
    paddingRight: 4,
  },
  headerIcon: {
    marginHorizontal: 6,
  },
});
