import DateTimeBox from "@/components/entry/DateTimeBox";
import ProcessingPopup from "@/components/entry/ProcessingPopup";
import SpeciesTag, { EnvironmentTag } from "@/components/entry/Tag";
import colors from "@/constants/Colors";
import fetchLocation from "@/hooks/fetchLocation";
import formatNumber from "@/hooks/formatNumber";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import { location } from "@/supabase/db_hooks/fetchGlobalEntriesByLocation";
import Entry, { EntryMetadata } from "@/supabase/entrySchema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GoogleGenAI } from "@google/genai";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import MapView, { Marker } from "react-native-maps";

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
  const { entryCount, loading, uploadEntry } = useEntryDataContext();

  let id = entryCount + 1;
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
  ): Promise<Partial<EntryMetadata> | "NONE" | null> => {
    try {
      const prompt = `Firstly, check if "${speciesName}" sounds like a valid animal or plant. If it is NOT, immediately return the word "NONE"
      and do not comply with the following instructions. If it is a valid animal or plant species, carry on with the following instructions.
      Return only a raw JSON object with the following data about the species "${speciesName}":
  {
    "description": "Brief description of the species with 2 fun facts integrated into the description, under 100 words. 
                    Make sure the sentences flow smoothly, and make it engaging for a reader",
    "weight": "xx-xx unit of measurement (kg or g)",
    "height": "xx-xx unit of measurement (m or cm)",
    "lifespan": "xx-xx unit of measurement (days, months, or years)",
    "speciesType": "Plant" or "Animal",
    "environmentType": "Terrestrial", "Aquatic", or "Flying",
    "rarity": "Common", "Uncommon", "Rare", "Very Rare", or "Unique"
  }
  
  The rarity of a species is determined by its global population size. If its less than 1000, return "Unique". If its between 1000 to 100000, return "Very Rare".
  If its between 100 000 to a million, return "Uncommon". Any number greater than that should return "Common".
  Be completely certain that the data is returned in the exact format as described. 
  Especially for "speciesType", "environmentType" and "rarity", make sure that the returned data is only limited to the options that were given to you.
  Respond ONLY with this JSON and nothing else. Do not wrap it in code blocks or add any commentary.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const raw = response.text?.trim();
      if (!raw) throw new Error("No response from Gemini");

      if (raw.toUpperCase() === "NONE") return "NONE";

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
        rarity: parsed.rarity
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

        if (aiSummary === "NONE") {
          setIsFetchingAPI(false);     // stop spinner
          Alert.alert(
            "Not a plant or animal!",
            "Please upload a photo of a plant or an animal.",
          [{ text: "OK", onPress: () => router.replace("/(tabs)/camera") }],
          { cancelable: false }
          );
        return;                      // bail out before setEntryMetaData
        }
/* =================== */

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
          setIsFetchingAPI(false);
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
    } finally {
      setIsFetchingAPI(false);
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
      location: currentLocation,
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

  let mapRef = React.createRef<MapView | null>();
  //TODO: Location set to center of singapore for now
  const [currentLocation, setCurrentLocation] = useState<location>({
    lat: 1.3518865175286692,
    long: 103.79266088828444,
  });

  const animateToCurrentLocation = async () => {
    const animateToLocation = (pos: location) => {
      mapRef.current?.animateToRegion(
        {
          longitude: pos.long,
          latitude: pos.lat,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        500
      );
    };

    const pos = await fetchLocation();
    if (pos) {
      setCurrentLocation({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
      animateToLocation({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    }
  };

  if (isFetchingAPI)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.tabBar} />
        <Text>Identifying species using AI...</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.title}>Entry Identified!</Text>
        <View style={styles.nameRow}>
          <Text style={styles.nameId}>{formatNumber(id?.toString() || "0")} - </Text>
            <TextInput
              style={styles.nameInput}
              value={entryMetaData.name}
              placeholder="Unknown Species"
              onChangeText={(text) =>
                setEntryMetaData((prev) => ({ ...prev, name: text }))
              }
              autoCorrect={false}
              autoCapitalize="words"
              placeholderTextColor="gray"
            />
        </View>

        <Image
          source={{ uri: photo }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.tagContainer}>
          <SpeciesTag species={entryMetaData.speciesType} />
          <EnvironmentTag env={entryMetaData.environmentType} />
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

        <View style={styles.datetimeBox}>
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
        <Text style={styles.locationBoxTitle}>Location</Text>
        <View style={styles.mapBox}>
          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: currentLocation.lat,
              latitudeDelta: 0.5,
              longitude: currentLocation.long,
              longitudeDelta: 0.5,
            }}
            ref={mapRef}
            onRegionChangeComplete={(region) =>
              setCurrentLocation({
                lat: region.latitude,
                long: region.longitude,
              })
            }
          >
            <Marker
              coordinate={{
                latitude: currentLocation.lat,
                longitude: currentLocation.long,
              }}
            ></Marker>
          </MapView>
          <MaterialCommunityIcons
            style={styles.crosshair}
            name="plus"
            size={20}
          />
          <TouchableOpacity
            onPress={animateToCurrentLocation}
            style={styles.locationButton}
          >
            <MaterialCommunityIcons name="crosshairs-gps" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit Entry</Text>
        </TouchableOpacity>
      </View>
      {true && (
        <ProcessingPopup
          isVisible={modalVisible}
          isLoading={loading}
          processingMessage="Registering Entry..."
          processedMessage="Entry Registered!"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignContent: "center",
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
  descriptionBox: {
    height: 120,
    fontSize: 16,
    width: "100%",
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
  datetimeBox: { height: 60, width: "100%" },
  observationContainer: {
    width: "100%",
    gap: 6,
  },
  observationBox: {
    fontSize: 16,
    height: 120,
    width: "100%",
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
  locationBox: {
    minHeight: 100,
    width: "100%",
    borderRadius: 15,
    borderCurve: "continuous",
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 16,
  },
  locationBoxTitle: {
    width: "100%",
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
  },
  mapBox: {
    height: 200,
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
  crosshair: {
    position: "absolute",
    left: "50%",
    bottom: "50%",
    transform: [{ translateY: "-50%" }, { translateX: "-50%" }],
  },
  locationButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    borderCurve: "circular",
    backgroundColor: colors.primary,
  },
  submitButton: {
    height: 40,
    width: "80%",
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
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  nameId: {
    fontSize: 25,
    fontWeight: "bold",
  },
  nameInput: {
    fontSize: 25,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 2,
    minWidth: 100,
    maxWidth: "70%",
  },
});
