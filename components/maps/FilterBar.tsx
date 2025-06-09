import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FilterDropdown from "./FilterDropdown";

export type Item = {
  label: string;
};

const raritySelection: Item[] = [
  { label: "Common" },
  { label: "Rare" },
  { label: "Very Rare" },
  { label: "Unique" },
];
const speciesSelection: Item[] = [{ label: "Plant" }, { label: "Animal" }];
const environmentSelection: Item[] = [
  { label: "Aquatic" },
  { label: "Terrestrial" },
  { label: "Flying" },
];

interface Filter {
  filterRarity: (rarity: string) => void;
  filterSpecies: (species: string) => void;
  filterEnv: (env: string) => void;
  filterReset: () => void;
}

export default function FilterBar({
  filterRarity,
  filterSpecies,
  filterEnv,
  filterReset,
}: Filter) {
  const [isReset, setIsReset] = useState<boolean>(false);

  return (
    <View style={styles.bar}>
      <FilterDropdown
        title="Rarity"
        data={raritySelection}
        onSelect={(selected) => {
          console.log(`Rarity "${selected}" selected`);
          filterRarity(selected);
        }}
        onReset={isReset}
      />
      <FilterDropdown
        title="Species"
        data={speciesSelection}
        onSelect={(selected) => {
          console.log(`SpeciesType "${selected}" selected`);
          filterSpecies(selected);
        }}
        onReset={isReset}
      />
      <FilterDropdown
        title="Environment"
        data={environmentSelection}
        onSelect={(selected) => {
          console.log(`EnvType "${selected}" selected`);
          filterEnv(selected);
        }}
        onReset={isReset}
      />
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          console.log("Reset filter selected");
          setIsReset(true);
          filterReset();
          setTimeout(() => setIsReset(false), 100);
        }}
      >
        <MaterialCommunityIcons name="refresh" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 8,
  },
  resetButton: {
    height: "80%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    borderCurve: "continuous",
    backgroundColor: colors.primary,
  },
});
