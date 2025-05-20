import AltHeaderTab from "@/app/components/AltHeaderBar";
import InfoBox from "@/app/components/InfoBox";
import colors from "@/app/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function viewEntry() {
  const router = useRouter();
  const onBack = () => router.back;

  const image = require("../../testData/WeirdBird.jpg");

  return (
    <ScrollView style={styles.container}>
      <AltHeaderTab onBack={onBack} />
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>Yellow Warbler</Text>
        <Text style={styles.entryText}>Captured on 1/1/2025, 1:30pm</Text>
        <Image source={image} style={styles.entryImage} />
        <View style={styles.entryTextBox}></View>
        <InfoBox title="Height" text="0.1m-0.4m" />
        <InfoBox title="Weight" text="0.05kg - 0.3kg" />
        <InfoBox title="Lifespan" text="10-12 years" />
        <Text style={styles.entryTextBoxTitle}>Observations</Text>
        <View style={styles.entryTextBox}></View>
      </View>
    </ScrollView>
  );
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
    gap: 16,
  },
  entryTitle: {
    flex: 1,
    fontSize: 40,
    fontWeight: "bold",
  },
  entryText: {
    flex: 1,
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
  entryTextBox: {
    minHeight: 100,
    width: "100%",
    borderRadius: 15,
    borderCurve: "continuous",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  entryTextBoxTitle: {
    flex: 0.4,
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
});
