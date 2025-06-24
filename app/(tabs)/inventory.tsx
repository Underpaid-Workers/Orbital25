import EntryCard from "@/components/entry/EntryCard";
import FloatingInfoBar from "@/components/entry/FloatingInfoBar";
import UsernameModal from "@/components/entry/UsernameModal";
import colors from "@/constants/Colors";
import { emptyImage, missingImage } from "@/constants/Image";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import { useUsernameCheck } from "@/supabase/auth_hooks/usernameCheck";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function inventory() {
  const { data, entryCount, speciesCount, score, loading, getEntries } =
    useEntryDataContext();

  const { needsUsername, saveDisplayName } = useUsernameCheck();

  useEffect(() => {
    getEntries(); // Refetch data on mount
  }, []);

  const [error, setError] = useState(false);

  const handleUsernameSubmit = async (username: string) => {
    const result = await saveDisplayName(username);
    if (!result.success) {
      Alert.alert("Username Error", result.error || "Failed to save username");
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tabBar} />
        </View>
      ) : error ? (
        <View style={styles.container}>
          <Image
            source={missingImage}
            contentFit="cover"
            style={styles.missingImage}
          />
          <Text style={styles.missingText}>Error : Unable to load</Text>
        </View>
      ) : entryCount === 0 ? (
        <View style={styles.container}>
          <FloatingInfoBar
            species={speciesCount}
            entries={entryCount}
            score={score}
          />
          <Image
            source={emptyImage}
            contentFit="cover"
            style={styles.missingImage}
          />
          <Text style={styles.missingText}>
            Start your collecting journey here!
          </Text>
          <View style={styles.missingIconContainer}>
            <MaterialCommunityIcons name="arrow-down" size={60} />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <FloatingInfoBar
            species={speciesCount}
            entries={entryCount}
            score={score}
          />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            ListHeaderComponent={<View style={{ height: 16 }} />}
            renderItem={({ item }) => (
              <EntryCard
                id={item.id}
                name={item.name}
                image={item.image}
                speciesType={item.speciesType}
                envType={item.environmentType}
                rarity={item.rarity}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={getEntries} />
            }
          />
        </View>
      )}

      {/* ✅ Always rendered, outside the condition */}
      <UsernameModal visible={needsUsername} onSubmit={handleUsernameSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
