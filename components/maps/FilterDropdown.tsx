import { Item } from "@/components/maps/FilterBar";
import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Dropdown {
  title: string;
  data: Item[];
  onSelect: (selected: string) => void;
}

export default function FilterDropdown({ title, data, onSelect }: Dropdown) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  return (
    <View style={styles.dropdown}>
      <Dropdown
        data={data}
        labelField={"label"}
        valueField={"label"}
        placeholder={title}
        placeholderStyle={styles.text}
        containerStyle={styles.item}
        itemContainerStyle={styles.item}
        selectedTextStyle={styles.text}
        renderRightIcon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            name={isFocused ? "chevron-up" : "chevron-down"}
            size={24}
          />
        )}
        value={selected}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(select) => {
          setSelected(select.label);
          setIsFocused(false);
          onSelect(select.label);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: "35%",
    height: "80%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  item: {
    borderRadius: 15,
  },
  text: {
    paddingLeft: 16,
    fontSize: 14,
  },
  icon: { paddingRight: 8 },
});
