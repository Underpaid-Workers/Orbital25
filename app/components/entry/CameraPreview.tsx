import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";

export default function CameraPreview({
  photo,
  retakePicture,
  savePicture,
}: {
  photo: string;
  retakePicture: () => void;
  savePicture: () => void;
}) {
  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={retakePicture}>
          <MaterialCommunityIcons name="camera-retake" size={60} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={savePicture}>
          <MaterialCommunityIcons name="content-save" size={60} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
    height: 80,
    minWidth: Dimensions.get("window").width,
    paddingHorizontal: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  button: {
    borderRadius: "100%",
    borderCurve: "circular",
    backgroundColor: colors.primary,
    padding: 8,
  },
  image: { height: "100%", width: "100%" },
});
