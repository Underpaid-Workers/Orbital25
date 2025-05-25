import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Species = {
  species: 'Animal' | 'Plant';
};

type Environment = {
  environment: 'Aquatic' | 'Flying' | 'Terrestrial';
};

const EnvironmentMap = {
  Aquatic: require("../../../assets/images/aquatic.png"),
  Flying: require("../../../assets/images/flying.png"),
  Terrestrial: require("../../../assets/images/terrestrial.png"),
};

export function SpeciesTag({species}: Species) {
  return (
    <View style={styles.tag}>
      <Image
        source={
          species === 'Animal'?
          require("../../../assets/images/animal.png")
          : require("../../../assets/images/plant.png")
        }
        style={styles.icon}
        />
      <Text style={styles.text}>{species}</Text>
    </View>
  );
}

export function EnvironmentTag({environment}: Environment) {
  return (
    <View style={styles.tag}>
      <Image
        source={EnvironmentMap[environment]}
        style={styles.icon}
        />
      <Text style={styles.text}>{environment}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D2D0A0", 
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: 100,
    justifyContent: "center",
    gap: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  text: {
    fontSize: 11,
    color: "#000",
  },
});