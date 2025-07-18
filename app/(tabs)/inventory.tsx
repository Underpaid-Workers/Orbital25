import EntryCard from "@/components/entry/EntryCard";
import FloatingInfoBar from "@/components/entry/FloatingInfoBar";
import NewBadgePopup from "@/components/entry/NewBadgesPopup";
import SearchBar from "@/components/entry/SearchBar";
import colors from "@/constants/Colors";
import { emptyImage, missingImage } from "@/constants/Image";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import { useUserdataContext } from "@/providers/UserdataProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function inventory() {
  const { data, loading, getEntries } = useEntryDataContext();
  const {
    entryCount,
    speciesCount,
    score,
    getUserdata,
    getUserBadges,
    updateUserProgressionBadges,
    userLoading,
  } = useUserdataContext();
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [badgeModalVisible, setBadgeModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getEntries();
    getUserdata();
    getUserBadges();
  }, []);

  useEffect(() => {
    updateUserProgressionBadges((badges) => {
      setBadgeCount(badges);
      getUserBadges();
      setBadgeModalVisible(true);
    });
  }, [entryCount]);

  const router = useRouter();
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const filteredData =
    searchInput !== ""
      ? data.filter((entry) =>
          entry.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : data;
  return (
    <>
      {loading || userLoading ? (
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
      ) : filteredData.length === 0 ? (
        <View style={styles.container}>
          <FloatingInfoBar
            species={speciesCount}
            entries={entryCount}
            score={score}
            onClick={() =>
              router.navigate({
                pathname: "/profile",
              })
            }
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
          <SearchBar
            placeholderText="Find a species..."
            onTextChange={setSearchInput}
          />
          <View style={{ height: 8 }}></View>
          <FloatingInfoBar
            species={speciesCount}
            entries={entryCount}
            score={score}
            onClick={() =>
              router.navigate({
                pathname: "/profile",
              })
            }
          />
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
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
                  onClickDetails={(id: number) => {
                    console.log(`Entry ${item.id} clicked`);
                    router.navigate({
                      pathname: "/(tabs)/entry/[id]",
                      params: { id },
                    });
                  }}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={getEntries} />
              }
            />
          ) : (
            <View style={styles.missingSearchContainer}>
              <Text style={styles.missingSearchText}>
                No Entries with name "{searchInput}"!
              </Text>
            </View>
          )}
        </View>
      )}
      {true && (
        <NewBadgePopup
          isVisible={badgeModalVisible}
          onDismiss={() => setBadgeModalVisible(false)}
          badgeCount={badgeCount}
        />
      )}
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
    position: "absolute",
    top: "70%",
    transform: [{ translateY: "-50%" }],
    flex: 0.1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  missingIconContainer: {
    position: "absolute",
    top: "75%",
    transform: [{ translateY: "-50%" }],
  },
  missingSearchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  missingSearchText: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    color: colors.text,
  },
});
