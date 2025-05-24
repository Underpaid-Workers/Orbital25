import DateTimeBox from "@/app/components/entry/DateTimeBox";
import AltHeaderTab from "@/app/components/main/AltHeaderBar";
import colors from "@/app/theme/colors";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function submitEntry() {
  const [simulateLoading, setSimulateLoading] = useState(true);
  const router = useRouter();
  const onBack = () => {
    if (router.canGoBack && router.canGoBack()) {
      router.back();
  } else {
      router.replace("/(tabs)/camera"); 
  }};
  const { photo, dateTime } = useLocalSearchParams<{
    photo: string;
    dateTime: string;
  }>();

  //dateTime sent in string
  const parsedDateTime = dateTime.split(",");

  useEffect(() => {
    const timeOut = setTimeout(() => setSimulateLoading(false), 500);
    return () => clearTimeout(timeOut);
  });

  if (simulateLoading)
    return (
      <View style={styles.container}>
        <Text>Identifying...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <AltHeaderTab onBack={onBack} />
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>Entry Registered!</Text>
        <Image source={photo} style={styles.entryImage} />
        <DateTimeBox
          day={parsedDateTime[0]}
          month={parsedDateTime[1]}
          year={parsedDateTime[2]}
          time={parsedDateTime[3]}
        />
        <Text style={styles.entryTextBoxTitle}>Observations</Text>
        <View style={styles.entryTextBox}>
          <TextInput style={styles.entryText} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  entryContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    gap: 12,
  },
  entryTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  entryImage: {
    flex: 2,
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
    borderCurve: "continuous",
  },
  entryText: {
    fontSize: 16,
    width: "100%",
  },
  entryTextBox: {
    flex: 1,
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
    flex: 0.2,
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "yellow",
  },
});
