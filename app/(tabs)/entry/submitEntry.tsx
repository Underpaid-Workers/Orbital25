import AltHeaderTab from "@/app/components/main/AltHeaderBar";
import { APIResult } from "@/app/hooks/useAPI";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ImageURISource, StyleSheet, Text, View } from "react-native";

interface Entry {
  dateTime: Date;
  image: ImageURISource;
  api: APIResult;
}

export default function submitEntry({ dateTime, image, api }: Entry) {
  const router = useRouter();
  const onBack = () => router.back;
  const id = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <AltHeaderTab onBack={onBack} />
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>Entry Registered!</Text>
        <Text style={styles.entryText}>
          Captured: {dateTime.toLocaleString()}
        </Text>
        <Image source={image} style={styles.entryImage} />
      </View>
    </View>
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
    gap: 12,
  },
  entryTitle: {
    flex: 1,
    fontSize: 40,
    fontWeight: "bold",
  },
  entryImage: {
    flex: 3,
    width: 178,
    height: 195,
    resizeMode: "cover",
    borderRadius: 15,
    borderCurve: "continuous",
  },
  entryText: {
    fontSize: 16,
  },
});
