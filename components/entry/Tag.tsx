import colors from "@/constants/Colors";
import {
  animalSpeciesTag,
  aquaticEnvTag,
  flyingEnvTag,
  plantSpeciesTag,
  terrestrialEnvTag,
} from "@/constants/Image";
import { Image, StyleSheet, Text, View } from "react-native";

type Species = {
  species: "Animal" | "Plant";
};

type Environment = {
  environment: "Aquatic" | "Flying" | "Terrestrial";
};

const EnvironmentMap = {
  Aquatic: aquaticEnvTag,
  Flying: flyingEnvTag,
  Terrestrial: terrestrialEnvTag,
};

export function SpeciesTag({ species }: Species) {
  return (
    <View style={styles.tag}>
      <Image
        source={species === "Animal" ? animalSpeciesTag : plantSpeciesTag}
        style={styles.icon}
      />
      <Text style={styles.text}>{species}</Text>
    </View>
  );
}

export function EnvironmentTag({ environment }: Environment) {
  return (
    <View style={styles.tag}>
      <Image source={EnvironmentMap[environment]} style={styles.icon} />
      <Text style={styles.text}>{environment}</Text>
    </View>
  );
}

export default SpeciesTag;

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.tag,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: 100,
    justifyContent: "space-around",
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 11,
  },
});
