import InfoBox from "@/app/components/entry/InfoBox";
import { EnvironmentTag, SpeciesTag } from "@/app/components/entry/Tag";
import useEntryDataContext from "@/app/hooks/useEntryDataContext";
import colors from "@/app/theme/colors";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function viewEntry() {
  //Allows this file to get respective id of EntryCard clicked through Expo router
  const { id } = useLocalSearchParams();

  //TODO : usage of testData here. API usage will require different implementation
  const entryData = useEntryDataContext();
  const entry = entryData.find((item) => item.id == id);
  return entry ? (
    <ScrollView style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>{entry.name}</Text>
        <Text style={styles.entryText}>
          Captured: {entry.dateTime.toLocaleString()}
        </Text>
        <Image source={entry.image} style={styles.entryImage} />
        <View style = {styles.tagContainer}>
        <SpeciesTag species = "Animal"/>
        <EnvironmentTag environment = "Flying" />
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
    resizeMode: "cover",
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
