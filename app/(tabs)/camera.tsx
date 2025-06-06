import CameraPreview from "@/components/entry/CameraPreview";
import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { ImageManipulator } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import moment from "moment";
import { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [photoCaptureTime, setPhotoCaptureTime] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  //returns the current datetime at the time of this function call
  //outputs in the format eg. "1, 5, 2025, 1:30 PM"
  const getNowDateTimeFormatted = () => moment().format("D,M,YYYY,h:mm A");

  //Resets photo information on leaving camera screen
  //TODO: Causes delay when opening camera though, since setting state causes delays? FIX
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        resetPhoto();
        setIsFocused(false);
      };
    }, [])
  );
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  //reset photo
  const resetPhoto = () => {
    setPhoto(undefined);
    setPhotoCaptureTime(getNowDateTimeFormatted());
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.3,
    });

    if (!result.canceled) {
      // dummy fixing ImagePicker bug in EXPO
      //TODO remove this bugfix when bug fixed
      const image = await (
        await ImageManipulator.manipulate(result.assets[0].uri).renderAsync()
      ).saveAsync();
      // //end of dummy fix...

      setPhoto(image.uri);
      setPhotoCaptureTime(getNowDateTimeFormatted());
    }
  };

  const takePicture = async () => {
    const takenPhoto = await cameraRef.current?.takePictureAsync({
      quality: 0.3,
    });

    // dummy fixing ImagePicker bug in EXPO
    // TODO remove this bugfix when bug fixed
    const image = await (
      await ImageManipulator.manipulate(takenPhoto?.uri!).renderAsync()
    ).saveAsync();
    //end of dummy fix...

    setPhoto(image.uri);
    setPhotoCaptureTime(getNowDateTimeFormatted());
  };

  const savePicture = () => {
    router.navigate({
      pathname: "/(tabs)/entry/submitEntry",
      params: { photo: photo, dateTime: photoCaptureTime },
    });
  };

  if (!permission) {
    //view rendered while camera permission still loading
    <View />;
  }

  //camera permission not granted
  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to show the camera.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  //Display photo once it is taken
  if (photo)
    return (
      <View style={styles.preview}>
        <CameraPreview
          photo={photo}
          retakePicture={resetPhoto}
          savePicture={savePicture}
        />
      </View>
    );

  return (
    <View style={styles.cameraContainer}>
      {isFocused && (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          animateShutter={false}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>Capture a species!</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <MaterialCommunityIcons
                name="camera-retake"
                size={40}
                color={"grey"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <MaterialCommunityIcons name="camera" size={70} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <MaterialCommunityIcons name="image" size={40} color={"grey"} />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  preview: {
    flex: 1,
  },
  camera: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    top: 40,
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    height: 90,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  cameraButton: {
    borderRadius: "100%",
    borderCurve: "circular",
    aspectRatio: 1,
    padding: 8,
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
