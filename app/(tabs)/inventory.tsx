import EntryCard from "@/components/entry/EntryCard";
import colors from "@/constants/Colors";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function inventory() {
  const { data, count, loading } = useEntryDataContext();

  //temporary setting for error state TODO: ACCOUNT FOR LACK OF INTERNET
  const [error, setError] = useState(false);

  //Loading! (Fetching userdata)
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={{ alignContent: "center" }}
          size="large"
          color={colors.tabBar}
        />
      </View>
    );
  }

  // TODO: SHIFT THESE STYLES
  if (count === 0) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/EmptyImage.png")}
          contentFit="cover"
          style={styles.missingImage}
        />
        <Text style={styles.missingText}>
          Start your collecting journey here!
        </Text>
        <Animated.View style={styles.missingIconContainer}>
          <MaterialCommunityIcons name="arrow-down" size={60} />
        </Animated.View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/MissingImage.png")}
          contentFit="cover"
          style={styles.missingImage}
        />
        <Text style={styles.missingText}>Error : Unable to load</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EntryCard id={item.id} name={item.name} image={item.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  cards: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  missingImage: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: "-50%" }],
    width: "45%",
    height: "30%",
    borderRadius: 15,
    borderCurve: "continuous",
  },
  missingText: {
    position: "fixed",
    top: "70%",
    transform: [{ translateY: "-50%" }],
    flex: 0.1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  missingIconContainer: {
    position: "fixed",
    top: "75%",
    transform: [{ translateY: "-50%" }],
  },
});
