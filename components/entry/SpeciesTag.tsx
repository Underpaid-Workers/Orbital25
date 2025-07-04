import colors from "@/constants/Colors";
import {
  animalSpeciesTag,
  placeholderImage,
  plantSpeciesTag,
} from "@/constants/Image";
import { Image, StyleSheet, Text, View } from "react-native";

const SpeciesColors = {
  animal: "#D7B0A5",
  plant: "#A0E0D4",
  undefined: "#E0DD9E",
};

export default function SpeciesTag({ species }: { species: string }) {
  let image;
  let color;
  let tag = species;
  switch (species) {
    case "Animal":
      image = animalSpeciesTag;
      color = SpeciesColors.animal;
      break;
    case "Plant":
      image = plantSpeciesTag;
      color = SpeciesColors.plant;
      break;
    default:
      image = placeholderImage; //TODO: replace with proper empty icon image
      color = SpeciesColors.undefined;
      tag = "Undefined";
  }

  return (
    <View style={[styles.tag, { backgroundColor: color }]}>
      <Image source={image} style={styles.icon} />
      <Text style={styles.text}>{tag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: 100,
    borderColor: colors.primary,
    borderWidth: 0,
  },
  icon: {
    width: 20,
    height: 20,
    color: colors.text,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: colors.text,
  },
});
