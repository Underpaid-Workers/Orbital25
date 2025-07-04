import colors from "@/constants/Colors";
import {
  aquaticEnvTag,
  flyingEnvTag,
  placeholderImage,
  terrestrialEnvTag,
} from "@/constants/Image";
import { Image, StyleSheet, Text, View } from "react-native";

const EnvironmentColors = {
  aquatic: "#C7E8F3",
  flying: "#FFD8D0",
  terrestrial: "#F4E2C3",
  undefined: "#E0DD9E",
};

export function EnvironmentTag({ env }: { env: string }) {
  let image;
  let color;
  let tag = env;
  switch (env) {
    case "Aquatic":
      image = aquaticEnvTag;
      color = EnvironmentColors.aquatic;
      break;
    case "Terrestrial":
      image = terrestrialEnvTag;
      color = EnvironmentColors.terrestrial;
      break;
    case "Flying":
      image = flyingEnvTag;
      color = EnvironmentColors.flying;
      break;
    default:
      image = placeholderImage; //TODO: replace with proper empty icon image
      color = EnvironmentColors.undefined;
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
