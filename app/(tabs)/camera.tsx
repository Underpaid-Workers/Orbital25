import { MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";

import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CameraPreview from "../components/entry/CameraPreview";
import useEntryCountContext from "../hooks/useEntryCountContext";
import colors from "../theme/colors";

export default function camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const id = useEntryCountContext();

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const retakePicture = () => setPhoto(undefined);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const takenPhoto = await cameraRef.current?.takePictureAsync({
      quality: 0.5,
      exif: true, //TODO: check exif information required
    });
    setPhoto(takenPhoto?.uri);
  };

  //TODO : complete savePicture functionality -> require storage permission?
  const savePicture = () => {
    // router.navigate({ pathname: "/(tabs)/entry/submitEntry", params: { id } });
    router.navigate("/(tabs)/entry/identifyEntry");
  };

  if (!permission) {
    //view rendered while camera permission still loading
    <View />;
  }

  //camera permission not granted
  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (photo)
    return (
      <CameraPreview
        photo={photo}
        retakePicture={retakePicture}
        savePicture={savePicture}
      />
    );

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Capture a species!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <MaterialIcons name="cameraswitch" size={40} color={"grey"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <MaterialIcons name="camera" size={80} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <MaterialIcons name="image" size={40} color={"grey"} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  textContainer: {
    position: "absolute",
    top: 40,
    height: 80,
    minWidth: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    height: 80,
    minWidth: Dimensions.get("window").width,
    paddingHorizontal: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  cameraButton: {
    borderRadius: "100%",
    borderCurve: "circular",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    aspectRatio: "1",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
