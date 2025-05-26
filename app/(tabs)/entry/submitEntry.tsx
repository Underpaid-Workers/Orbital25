import DateTimeBox from "@/app/components/entry/DateTimeBox";
import SuccessPopup from "@/app/components/entry/SuccessPopup";
import { EnvironmentTag, SpeciesTag } from "@/app/components/entry/Tag";
import useFormatNumber from "@/app/hooks/useFormatNumber";
import colors from "@/app/theme/colors";
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
  const { id, photo, dateTime } = useLocalSearchParams<{
    id: string;
    photo: string;
    dateTime: string;
  }>();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      router.navigate("/(tabs)/inventory");
    }, 700);
  };

  //dateTime sent in string
  const parsedDateTime = dateTime.split(",");

  //Simulated api fetching from AI/ML API
  const [simulateLoading, setSimulateLoading] = useState(true);
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
  //end of simulated api fetching

  return (
    <View style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.title}>Entry Identified!</Text>
        <Text style={styles.name}>{useFormatNumber(id)} Weird Bird</Text>
        <Image source={photo} style={styles.image} contentFit="cover" />
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
            This is a placeholder for the description of your entry. This is a
            placeholder for the description of your entry.This is a placeholder
            for the description of your entry.This is a placeholder for the
            description of your entry.This is a placeholder for the description
            of your entry.This is a placeholder for the description of your
            entry.This is a placeholder for the description of your entry.This
            is a placeholder for the description of your entry.This is a
            placeholder for the description of your entry.
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
            style={styles.observationBox}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit Entry</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && <SuccessPopup isVisible={modalVisible} />}
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
