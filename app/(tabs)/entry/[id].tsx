import InfoBox from "@/components/entry/InfoBox";
import ProcessingPopup from "@/components/entry/ProcessingPopup";
import SpeciesTag, { EnvironmentTag } from "@/components/entry/Tag";
import colors from "@/constants/Colors";
import useFormatDateTimeDisplay from "@/hooks/useFormatDateTimeDisplay";
import useFormatNumber from "@/hooks/useFormatNumber";
import { useAuthContext } from "@/providers/AuthProvider";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import deleteEntry from "@/supabase/db_hooks/deleteEntry";
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

export default function viewEntry() {
  //Allows this file to get respective id of EntryCard clicked through Expo router
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, getData } = useEntryDataContext();
  const { session } = useAuthContext();
  //search for specific entry in entryData
  const entry = data[Number.parseInt(id)];

  const dateTime = entry.datetime
    ? useFormatDateTimeDisplay(entry.datetime)
    : "<No date available>";
  const displayId = entry.id ? useFormatNumber(entry.id.toString()) : "#000";

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = () => {
    const onBegin = () => {
      setLoading(true);
    };

    const onComplete = () => {
      setLoading(false);
      console.log("Entry deleted");
      getData();
    };

    if (session) {
      console.log("Session detected, deleting entry");
      deleteEntry(session, entry.id, entry.image, onBegin, onComplete);
    }

    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      router.navigate("/(tabs)/inventory");
    }, 700);
  };
  console.warn(entry.image);
  return entry !== undefined ? (
    <ScrollView style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>
          {displayId} {entry.name}
        </Text>
        <Text style={styles.entryText}>Captured: {dateTime}</Text>
        <Image
          source={entry.image}
          style={styles.entryImage}
          contentFit="cover"
        />
        <View style={styles.tagContainer}>
          <SpeciesTag species="Animal" />
          <EnvironmentTag environment="Flying" />
        </View>
        <View style={styles.entryTextBox}>
          <Text style={styles.entryText}>{entry.description}</Text>
        </View>
        <InfoBox title="Height" text={entry.height} />
        <InfoBox title="Weight" text={entry.weight} />
        <InfoBox title="Lifespan" text={entry.lifespan} />
        <Text style={styles.entryTextBoxTitle}>Observations</Text>
        <View style={styles.entryTextBox}>
          <Text style={styles.entryText}>{entry.observations}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete Entry</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <ProcessingPopup
          isVisible={modalVisible}
          isLoading={loading}
          processingMessage="Deleting Entry...!"
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
    fontSize: 40,
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
    justifyContent: "center",
  },
  entryTextBoxTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
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
