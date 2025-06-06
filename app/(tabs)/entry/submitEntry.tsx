import DateTimeBox from "@/components/entry/DateTimeBox";
import ProcessingPopup from "@/components/entry/ProcessingPopup";
import { EnvironmentTag, SpeciesTag } from "@/components/entry/Tag";
import colors from "@/constants/Colors";
import useFormatNumber from "@/hooks/useFormatNumber";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import Entry, { EntryMetadata } from "@/supabase/entrySchema";
import { GoogleGenAI } from "@google/genai";
import Constants from "expo-constants";
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

//
//
//
// TODO : SET UP LOCATION LOGIC
//
//
//
//

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

export default function submitEntry() {
  const router = useRouter();
  const { count, loading, uploadEntry } = useEntryDataContext();

  let id = count + 1;
  const { photo, datetime } = useLocalSearchParams<{
    photo: string;
    datetime: string;
  }>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const parsedDateTime = datetime.split(",");
  const [isFetchingAPI, setIsFetchingAPI] = useState<boolean>(false);
  const [observations, setObservations] = useState<string>("");
  const [entryMetaData, setEntryMetaData] = useState<EntryMetadata>({
    name: "",
    environmentType: "",
    speciesType: "",
    rarity: "",
    description: "",
    height: "",
    weight: "",
    lifespan: "",
  });

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCvvv5D5gE2Ydh6V6wxyummkjsyI-PYeWY",
  });

  const fetchAiSummary = async (
    speciesName: string
  ): Promise<Partial<EntryMetadata> | null> => {
    try {
      const prompt = `Return only a raw JSON object with the following data about the species "${speciesName}":
  {
    "description": "Brief description of the species with 2 fun facts integrated, under 100 words.",
    "weight": "xx-xx unit of measurement (kg or g)",
    "height": "xx-xx unit of measurement (m or cm)",
    "lifespan": "xx-xx unit of measurement (days, months, or years)",
    "speciesType": "plant or animal",
    "environmentType": "terrestrial, aquatic, or flying",
    "rarity": "common, uncommon, rare, very rare, or unique"
  }

  Respond ONLY with this JSON and nothing else. Do not wrap it in code blocks or add any commentary.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const raw = response.text;

      if (!raw) throw new Error("No response from Gemini");

      //remove syntax error
      const match = raw.match(/{[\s\S]*}/);
      if (!match) throw new Error("No valid JSON block found in response");

      const parsed = JSON.parse(match[0]);
      console.log(parsed);

      if (!parsed || typeof parsed !== "object") return null;

      return {
        description: parsed.description || "",
        weight: parsed.weight || "",
        height: parsed.height || "",
        lifespan: parsed.lifespan || "",
        speciesType: parsed.speciesType || "",
        environmentType: parsed.environmentType || "",
      };
    } catch (error) {
      console.error("AI summary fetch error:", error);
      return null;
    }
  };

  const classifyImage = async (photoUri: string) => {
    try {
      setIsFetchingAPI(true);

      const base64Image = await FileSystem.readAsStringAsync(photoUri, {
        encoding: "base64",
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
        const aiSummary = await fetchAiSummary(speciesName);

        if (!aiSummary) {
          throw new Error("error with returning summary");
        } else {
          setEntryMetaData({
            name: speciesNameUppercased,
            description: aiSummary.description || "",
            speciesType: aiSummary.speciesType || "",
            environmentType: aiSummary.environmentType || "",
            rarity: aiSummary.rarity || "",
            weight: aiSummary.weight || "",
            height: aiSummary.height || "",
            lifespan: aiSummary.lifespan || "",
          });
        }
      }
    } catch (error) {
      console.error("Classification error:", error);

      let errorMessage = "Could not identify species";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setIsFetchingAPI(false);
      Alert.alert("AI Identification Failed", errorMessage);
      router.replace("/(tabs)/camera");
    }
  };

  useEffect(() => {
    if (photo) {
      classifyImage(photo).catch(console.error);
    }
  }, [photo]);

  const onSubmit = () => {
    const submitting: Entry = {
      id: id,
      name: entryMetaData.name,
      datetime: datetime,
      environmentType: entryMetaData.environmentType,
      speciesType: entryMetaData.speciesType,
      rarity: entryMetaData.rarity,
      location: { lat: 0, long: 0 },
      image: photo,
      description: entryMetaData.description,
      height: entryMetaData.height,
      weight: entryMetaData.weight,
      lifespan: entryMetaData.lifespan,
      observations: observations,
    };
    console.log(submitting);

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
          {useFormatNumber(id?.toString() || "0")} + " - "
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
            placeholderTextColor={"gray"}
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
