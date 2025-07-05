import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

interface Search {
  placeholderText: string;
  onTextChange: (text: string) => void;
}

export default function SearchBar({ placeholderText, onTextChange }: Search) {
  return (
    <View style={styles.bar}>
      <TextInput
        style={styles.textBox}
        placeholder={placeholderText}
        onChangeText={(text) => onTextChange(text)}
      />
      <View style={styles.searchButton}>
        <MaterialCommunityIcons name="magnify" size={28} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 50,
    width: "100%",
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
