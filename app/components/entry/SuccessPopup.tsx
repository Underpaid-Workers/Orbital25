import colors from "@/app/theme/colors";
import { Image } from "expo-image";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface Props {
  isVisible: boolean;
}

export default function SuccessPopup({ isVisible }: Props) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.background}>
        <View style={styles.content}>
          <Image
            source={require("@/assets/images/SuccessImage.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.text}>Entry Registered!</Text>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 0.15,
    width: 300,
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
