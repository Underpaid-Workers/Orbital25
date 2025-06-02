import DateTimeBox from "@/components/entry/DateTimeBox";
import ProcessingPopup from "@/components/entry/ProcessingPopup";
import { EnvironmentTag, SpeciesTag } from "@/components/entry/Tag";
import colors from "@/constants/Colors";
import useFormatNumber from "@/hooks/useFormatNumber";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import { FullInsertEntry, InsertEntryMetadata } from "@/supabase/entrySchema";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Constants from "expo-constants";

let hfToken: any = null;
let hfModelUrl: any = null;

if (Constants.expoConfig && Constants.expoConfig.extra) {
  hfToken = Constants.expoConfig.extra.hfToken as string;
  hfModelUrl = Constants.expoConfig.extra.hfModelUrl as string;
} else {
  console.error(
    "Expo config (Constants.expoConfig.extra) is missing. Cannot load API keys."
  );
}

// Ensure that the keys are actually loaded (good for debugging)
if (!hfToken) {
  console.error(
    "Hugging Face Token is missing AFTER loading attempt! Check your .env and app.config.js"
  );
} else {
  console.log("Hugging Face Token loaded");
}
if (!hfModelUrl) {
  console.error(
    "Hugging Face Mode URL is missing AFTER loading attempt! Check your .env and app.config.js"
  );
} else {
  console.log("Hugging Face Mode URL loaded");
}

export default function submitEntry() {
  const { photo, dateTime } = useLocalSearchParams<{
    photo: string;
    dateTime: string;
  }>();
  const router = useRouter();
  const { count, loading, uploadEntry } = useEntryDataContext();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const parsedDateTime = dateTime.split(",");
  const [isFetchingAPI, setIsFetchingAPI] = useState<boolean>(false);
  const [id, setId] = useState<number>(count + 1);
  const [observations, setObservations] = useState<string>("");
  const [entryMetaData, setEntryMetaData] = useState<InsertEntryMetadata>({
    name: "",
    environmentType: "",
    speciesType: "",
    description: "",
    height: "",
    weight: "",
    lifespan: "",
  });

  const fetchWikipediaSummary = async (title: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          title
        )}`
      );

      if (!response.ok) throw new Error("Not found");

      const data = await response.json();
      if (data.extract) {
        return data.extract;
      } else {
        return "Could not find description";
      }
    } catch (error) {
      console.error("Wikipedia fetch error:", error);
      return "Could not find description";
    }
  };

  const classifyImage = async (photoUri: string) => {
    try {
      setIsFetchingAPI(true);

      const base64Image = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await fetch(hfModelUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: base64Image }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }
      const data = await response.json();
      const prediction = data?.[0];

      if (prediction?.label) {
        const speciesName = prediction.label.split(",")[0].trim() as string;
        const speciesNameUppercased = speciesName
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.substring(1))
          .join(" ");
        const wikiSummary = await fetchWikipediaSummary(speciesName);
        setEntryMetaData({
          ...entryMetaData,
          name: speciesNameUppercased,
          description: wikiSummary,
        });
      }
    } catch (error) {
      console.warn();
      console.error("Classification error:", error);

      let errorMessage = "Could not identify species";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert("AI Identification Failed", errorMessage);
      //if unable to identify, it should redirect user back to camera
      router.replace("/(tabs)/camera");
    }

    setIsFetchingAPI(false);
  };

  useEffect(() => {
    let isMounted = true;

    if (photo) {
      classifyImage(photo).catch(console.error);
    }

    return () => {
      isMounted = false;
    };
  }, [photo]);

  const onSubmit = () => {
    const submitting: FullInsertEntry = {
      id: id,
      name: entryMetaData.name,
      dateTime: dateTime,
      environmentType: "",
      speciesType: "",
      image: photo,
      description: entryMetaData.description,
      height: "",
      weight: "",
      lifespan: "",
      observations: observations,
    };

    const onComplete = () => {
      setModalVisible(false);
      router.replace("/(tabs)/inventory");
    };

    setModalVisible(true);
    uploadEntry(submitting, onComplete);
  };

  if (isFetchingAPI)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.tabBar} />
        <Text>Identifying species using AI...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.title}>Entry Identified!</Text>
        <Text style={styles.name}>
          {useFormatNumber(id?.toString() || "0")} -{" "}
          {entryMetaData.name !== "" ? entryMetaData.name : "Unknown Species"}
        </Text>
        <Image
          source={{ uri: photo }}
          style={styles.image}
          contentFit="cover"
        />
        {/* TODO: DYNAMIC SPECIES AND ENV TAGGING */}
        <View style={styles.tagContainer}>
          <SpeciesTag species="Animal" />
          <EnvironmentTag environment="Flying" />
        </View>
        <ScrollView
          style={styles.descriptionBox}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <Text style={styles.descriptionBoxText}>
            {entryMetaData.description !== ""
              ? entryMetaData.description
              : "There's no description..."}
          </Text>
        </ScrollView>

        <View style={{ flex: 0.35, width: "100%" }}>
          <DateTimeBox
            day={parsedDateTime[0]}
            month={parsedDateTime[1]}
            year={parsedDateTime[2]}
            time={parsedDateTime[3]}
          />
        </View>
        <View style={styles.observationContainer}>
          <Text style={styles.observationBoxTitle}>Observations</Text>
          <TextInput
            multiline
            numberOfLines={10}
            placeholder="A brief description of the entry/its surroundings..."
            onChangeText={(observation) => setObservations(observation)}
            style={styles.observationBox}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit Entry</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <ProcessingPopup
          isVisible={modalVisible}
          isLoading={loading}
          processingMessage="Registering Entry..."
          processedMessage="Entry Registered!"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  entryContainer: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1.5,
    aspectRatio: 0.75,
    borderRadius: 15,
    borderCurve: "continuous",
  },
  tagContainer: {
    flexDirection: "row",
    gap: 8,
  },
  descriptionBox: {
    flex: 0.5,
    maxHeight: 120,
    fontSize: 16,
    minHeight: 20,
    minWidth: "100%",
    borderRadius: 15,
    borderCurve: "continuous",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  descriptionBoxText: {
    fontSize: 16,
    textAlign: "justify",
    textAlignVertical: "top",
    flexWrap: "wrap",
  },
  observationContainer: {
    flex: 1,
    gap: 6,
  },
  observationBox: {
    flex: 0.8,
    fontSize: 16,
    minHeight: 80,
    minWidth: "100%",
    borderRadius: 15,
    borderCurve: "continuous",
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 16,
    textAlign: "justify",
    textAlignVertical: "top",
  },
  observationBoxTitle: {
    minWidth: "100%",
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    flex: 0.3,
    height: 20,
    minWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 15,
    borderCurve: "continuous",
  },
  submitButtonText: {
    fontSize: 20,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});
