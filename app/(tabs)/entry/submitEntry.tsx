import DateTimeBox from "@/components/entry/DateTimeBox";
import ProcessingPopup from "@/components/entry/ProcessingPopup";
import { EnvironmentTag, SpeciesTag } from "@/components/entry/Tag";
import colors from "@/constants/Colors";
import useFormatNumber from "@/hooks/useFormatNumber";
import { useAuthContext } from "@/providers/AuthProvider";
import { useEntryDataContext } from "@/providers/EntryDataProvider";
import insertEntry from "@/supabase/db_hooks/insertEntry";
import { FullInsertEntry } from "@/supabase/entrySchema";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function submitEntry() {
  const { photo, dateTime } = useLocalSearchParams<{
    photo: string;
    dateTime: string;
  }>();

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  //get id from entryData count
  const { count, getData } = useEntryDataContext();
  const { session } = useAuthContext();

  //dateTime sent in string
  const parsedDateTime = dateTime.split(",");

  //Simulated api fetching from AI/ML API
  const [simulateLoading, setSimulateLoading] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => setSimulateLoading(false), 500);
    return () => clearTimeout(timeOut);
  });

  const submitting: FullInsertEntry = {
    id: count,
    name: "",
    dateTime: dateTime,
    environmentType: "",
    speciesType: "",
    image: photo,
    description: "",
    height: "",
    weight: "",
    lifespan: "",
    observations: "",
  };

  const onSubmit = () => {
    const onBegin = () => {
      setLoading(true);
    };

    const onComplete = () => {
      setLoading(false);
      console.log("Entry Inserted");
      getData();
    };

    if (session) {
      console.log("Session detected, inserting entry");
      insertEntry(session, submitting, onBegin, onComplete);
    }

    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      router.navigate("/(tabs)/inventory");
    }, 700);
  };

  // simulate API fetching
  if (simulateLoading)
    return (
      <View style={styles.container}>
        <Text>Identifying...</Text>
      </View>
    );
  //end of simulated api fetching

  return (
    <View style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.title}>Entry Identified!</Text>
        <Text style={styles.name}>
          {useFormatNumber(count.toString())}
          {submitting.name !== "" ? submitting.name : "<Name>"}
        </Text>
        <Image source={photo} style={styles.image} contentFit="cover" />
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
            {submitting.description !== ""
              ? submitting.description
              : "Theres no description..."}
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
            onChangeText={(observation) =>
              (submitting.observations = observation)
            }
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
    fontSize: 20,
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
