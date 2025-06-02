import { EnvironmentTag, SpeciesTag } from "@/components/entry/Tag";
import colors from "@/constants/Colors";
import useFormatNumber from "@/hooks/useFormatNumber";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EntryCard {
  id: number;
  name: string;
  image: string;
}

export default function EntryCard({ id, name, image }: EntryCard) {
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
        colors={[colors.primary, "#1E7744"]}
        end={{ x: 1, y: 0 }}
        style={styles.cardGradient}
      >
        {/* Id Number + Entry Name */}
        <View style={styles.textContent}>
          <Text style={styles.index}>{useFormatNumber(id.toString())}</Text>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.tagContainer}>
            <SpeciesTag species="Animal" />
            <EnvironmentTag environment="Flying" />
          </View>
        </View>

        {/* Image */}
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
    height: 160,
    minWidth: "100%",
    borderRadius: 15,
    paddingVertical: 10,
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
