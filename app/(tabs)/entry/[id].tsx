import InfoBox from "@/components/entry/InfoBox";
import SpeciesTag, { EnvironmentTag } from "@/components/entry/Tag";
import colors from "@/constants/Colors";
import useFormatDateTimeDisplay from "@/hooks/useFormatDateTimeDisplay";
import useFormatNumber from "@/hooks/useFormatNumber";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function viewEntry() {
  //Allows this file to get respective id of EntryCard clicked through Expo router
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useEntryDataContext();

  const entry = data[Number.parseInt(id)];

  const dateTime = entry.datetime
    ? useFormatDateTimeDisplay(entry.datetime)
    : "<No date available>";

  const displayId = entry.id ? useFormatNumber(entry.id.toString()) : "#000";

  return entry ? (
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
      </View>
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
});
