import { StyleSheet, View } from "react-native";
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

//TODO: Link the onSelect to a filter function on supabase

export default function FilterBar() {
  return (
    <View style={styles.bar}>
      <FilterDropdown
        title="Rarity"
        data={raritySelection}
        onSelect={(selected) => {
          console.log(`Rarity "${selected}" selected`);
        }}
      />
      <FilterDropdown
        title="Species"
        data={speciesSelection}
        onSelect={(selected) => {
          console.log(`SpeciesType "${selected}" selected`);
        }}
      />
      <FilterDropdown
        title="Something"
        data={raritySelection}
        onSelect={(selected) => {
          console.log(selected + " selected");
        }}
      />
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
});
