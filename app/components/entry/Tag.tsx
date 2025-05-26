import colors from "@/app/theme/colors";
import { Image, StyleSheet, Text, View } from "react-native";

type Species = {
  species: "Animal" | "Plant";
};

type Environment = {
  environment: "Aquatic" | "Flying" | "Terrestrial";
};

const EnvironmentMap = {
  Aquatic: require("../../../assets/images/aquatic.png"),
  Flying: require("../../../assets/images/flying.png"),
  Terrestrial: require("../../../assets/images/terrestrial.png"),
};

export function SpeciesTag({ species }: Species) {
  return (
    <View style={styles.tag}>
      <Image
        source={
          species === "Animal"
            ? require("../../../assets/images/animal.png")
            : require("../../../assets/images/plant.png")
        }
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
