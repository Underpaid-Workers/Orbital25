import InfoBox from "@/components/entry/InfoBox";
import ProcessingPopup from "@/components/entry/ProcessingPopup";
import SpeciesTag, { EnvironmentTag } from "@/components/entry/Tag";
import colors from "@/constants/Colors";
import { placeholderImage } from "@/constants/Image";
import formatDateTimeDisplay from "@/hooks/formatDateTimeDisplay";
import formatNumber from "@/hooks/formatNumber";
import formatRarityToGradient from "@/hooks/formatRarityToGradient";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function viewEntry() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading, removeEntry } = useEntryDataContext();

  //data is 0-indexed, while id is 1 indexed
  const entry = data[Number.parseInt(id) - 1];

  let datetime = "<No date available>";
  let displayId = "#000";
  let observations = "Nothing written here...";

  if (entry !== undefined) {
    datetime = formatDateTimeDisplay(entry.datetime);
    displayId = formatNumber(entry.id.toString());
    observations =
      entry.observations !== "" ? entry.observations : observations;
  }

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const onDelete = () => {
    const onComplete = () => {
      setModalVisible(false);
      router.replace("/(tabs)/inventory");
    };

    setModalVisible(true);
    removeEntry(entry.id, entry.image, onComplete);
  };

  return entry !== undefined ? (
    <ScrollView style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>
          {displayId} - {entry.name}{" "}
          <MaterialCommunityIcons
            name="cards-playing-diamond-multiple"
            size={30}
            color={formatRarityToGradient(entry.rarity)[0]}
          />
        </Text>
        <Text style={styles.entryText}>Captured: {datetime}</Text>
        <Image
          source={entry.image}
          style={styles.entryImage}
          contentFit="cover"
          placeholder={placeholderImage}
        />
        <View style={styles.tagContainer}>
          <SpeciesTag species={entry.speciesType} />
          <EnvironmentTag env={entry.environmentType} />
        </View>
        <View style={styles.entryTextBox}>
          <Text style={styles.entryText}>{entry.description}</Text>
        </View>
        <InfoBox title="Height" text={entry.height} />
        <InfoBox title="Weight" text={entry.weight} />
        <InfoBox title="Lifespan" text={entry.lifespan} />
        <Text style={styles.entryTextBoxTitle}>Observations</Text>
        <View style={styles.entryTextBox}>
          <Text style={styles.entryText}>{observations}</Text>
        </View>
        <Text style={styles.entryTextBoxTitle}>Location</Text>
        <View style={styles.mapBox}>
          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: entry.location.lat,
              latitudeDelta: 0.1,
              longitude: entry.location.long,
              longitudeDelta: 0.1,
            }}
            cacheEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: entry.location.lat,
                longitude: entry.location.long,
              }}
            ></Marker>
          </MapView>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete Entry</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <ProcessingPopup
          isVisible={modalVisible}
          isLoading={loading}
          processingMessage="Deleting Entry..."
          processedMessage="Entry Deleted!"
        />
      )}
    </ScrollView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  entryContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    gap: 12,
  },
  entryTitle: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  entryText: {
    fontSize: 16,
  },
  entryImage: {
    flex: 3,
    width: 178,
    height: 195,
    borderRadius: 15,
    borderCurve: "continuous",
  },
  tagContainer: {
    flexDirection: "row",
    gap: 8,
  },
  entryTextBox: {
    minHeight: 100,
    width: "100%",
    borderRadius: 15,
    borderCurve: "continuous",
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 16,
  },
  entryTextBoxTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  mapBox: {
    height: 150,
    width: "100%",
    borderRadius: 15,
    borderCurve: "continuous",
    overflow: "hidden",
    backgroundColor: "yellow",
  },
  mapView: {
    height: "100%",
    width: "100%",
  },
  deleteButton: {
    height: 40,
    minWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E23636",
    borderRadius: 15,
    borderCurve: "continuous",
  },
  deleteButtonText: {
    fontSize: 20,
    textAlign: "center",
  },
});
