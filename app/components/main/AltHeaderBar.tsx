import colors from "@/app/theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AltHeaderTab({
  navigation,
  route,
}: BottomTabHeaderProps) {
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.headerTab}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <MaterialCommunityIcons name="chevron-left" size={24} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTab: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    height: 50,
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
