import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface Search {
  placeholderText: string;
  onTextChange?: () => void;
  onSearch: () => void;
}

export default function SearchBar({
  placeholderText,
  onTextChange,
  onSearch,
}: Search) {
  return (
    <View style={styles.bar}>
      <TextInput
        style={styles.textBox}
        placeholder={placeholderText}
        onChangeText={onTextChange}
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <MaterialCommunityIcons name="magnify" size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 60,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 15,
    borderCurve: "continuous",
    borderColor: colors.primary,
    borderWidth: 0.3,
    backgroundColor: "white",
  },
  textBox: {
    flex: 15,
    height: "100%",
    fontSize: 18,
    marginEnd: 4,
  },
  searchButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
