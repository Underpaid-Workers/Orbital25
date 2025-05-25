import { EnvironmentTag, SpeciesTag } from "@/app/components/entry/Tag";
import useFormatNumber from "@/app/hooks/useFormatNumber";
import colors from "@/app/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface entry {
  id: string;
  name: string;
  image: ImageURISource;
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
          <Text style={styles.index}>{useFormatNumber(id)}</Text>
          <Text style={styles.name}>{name}</Text>
          <View style = {styles.tagContainer}>
            <SpeciesTag species = "Animal"/>
            <EnvironmentTag environment = "Flying"/>
          </View>
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
