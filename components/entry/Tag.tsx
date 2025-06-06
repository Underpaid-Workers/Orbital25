import colors from "@/constants/Colors";
import {
  animalSpeciesTag,
  aquaticEnvTag,
  flyingEnvTag,
  placeholderImage,
  plantSpeciesTag,
  terrestrialEnvTag,
} from "@/constants/Image";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SpeciesTag({ species }: { species: string }) {
  let image;
  let tag = species;
  switch (species) {
    case "animal":
      image = animalSpeciesTag;
      break;
    case "plant":
      image = plantSpeciesTag;
      break;
    default:
      image = placeholderImage; //TODO: replace with proper empty icon image
      tag = "Undefined";
  }

  return (
    <View style={styles.tag}>
      <Image source={image} style={styles.icon} />
      <Text style={styles.text}>{tag}</Text>
    </View>
  );
}

export function EnvironmentTag({ env }: { env: string }) {
  let image;
  let tag = env;
  switch (env) {
    case "aquatic":
      image = aquaticEnvTag;
      break;
    case "terrestrial":
      image = terrestrialEnvTag;
      break;
    case "flying":
      image = flyingEnvTag;
      break;
    default:
      image = placeholderImage; //TODO: replace with proper empty icon image
      tag = "Undefined";
  }
  return (
    <View style={styles.tag}>
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
    backgroundColor: colors.tag,
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
