import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../theme/colors";

interface entry {
  id: string;
  name: string;
  image: ImageURISource;
}

//function to format id as single number string into "#XXX"
function formatNumber(input: string): string {
  // Pad with leading zeros up to 3 characters, then prefix "#"
  const padded = input.padStart(3, "0");
  return `#${padded}`;
}

export default function EntryCard({ id, name, image }: entry) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.navigate({
          pathname: "/(tabs)/entry/[id]",
          params: { id },
        });
      }}
    >
      <LinearGradient
        colors={[colors.primary, "#1E7744"]}
        end={{ x: 1, y: 0 }}
        style={styles.cardGradient}
      >
        {/* Id Number + Entry Name */}
        <View style={styles.textContent}>
          <Text style={styles.index}>{formatNumber(id)}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>

        {/* Image */}
        <View style={styles.imageContent}>
          <Image source={image} style={styles.image} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 150,
    borderRadius: 15,
    paddingVertical: 10,
  },
  cardGradient: {
    flex: 1,
    flexDirection: "row",
    height: 150,
    borderRadius: 15,
    paddingVertical: 16,
  },
  textContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingEnd: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  image: {
    height: 100,
    aspectRatio: 0.93,
    resizeMode: "cover",
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
