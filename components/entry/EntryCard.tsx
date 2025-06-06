import colors from "@/constants/Colors";
import formatNumber from "@/hooks/formatNumber";
import formatRarirtyToGradient from "@/hooks/formatRarityToGradient";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SpeciesTag, { EnvironmentTag } from "./Tag";

interface EntryCard {
  id: number;
  name: string;
  image: string;
  rarity: string;
  speciesType: string;
  envType: string;
}

export default function EntryCard({
  id,
  name,
  image,
  rarity,
  speciesType,
  envType,
}: EntryCard) {
  const router = useRouter();

  const onClickDetails = () => {
    console.log(`Entry ${id} clicked`);
    router.navigate({
      pathname: "/(tabs)/entry/[id]",
      params: { id },
    });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onClickDetails}>
      <LinearGradient
        colors={formatRarirtyToGradient(rarity)}
        start={{ x: 0, y: 0.9 }}
        end={{ x: 0.1, y: 1.6 }}
        dither={true}
        style={styles.cardGradient}
      >
        <View style={styles.textContent}>
          <Text style={styles.index}>{formatNumber(id.toString())}</Text>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.tagContainer}>
            <SpeciesTag species={speciesType} />
            <EnvironmentTag env={envType} />
          </View>
        </View>
        <View style={styles.imageContent}>
          <Image source={image} style={styles.image} contentFit="cover" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 140,
    minWidth: "100%",
    borderRadius: 15,
    borderColor: colors.primary,
    borderWidth: 0.3,
  },
  cardGradient: {
    flex: 1,
    flexDirection: "row",
    height: 160,
    borderRadius: 15,
    paddingVertical: 16,
  },
  textContent: {
    flex: 2,
    paddingLeft: 16,
  },
  tagContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 8,
  },
  imageContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingEnd: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  image: {
    height: "120%",
    aspectRatio: 0.9,
    borderRadius: 15,
  },
  index: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
