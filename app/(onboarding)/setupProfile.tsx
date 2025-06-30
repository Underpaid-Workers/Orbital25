import colors from "@/constants/Colors";
import { logoTransparent } from "@/constants/Image";
import { useAuthContext } from "@/providers/AuthProvider";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function setupProfile() {
  const router = useRouter();
  const { session, updateUsername } = useAuthContext();
  const [username, setUsername] = useState<string>("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Image source={logoTransparent} style={styles.logoTransparent} />
        <Text style={styles.text}>EcoDex</Text>
        <Text style={styles.welcomeMessageText}>
          Welcome!{"\n"}What shall we call you?
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
          placeholder="Add a username!"
          placeholderTextColor={colors.gray}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            updateUsername(username);
            router.replace("/(tabs)/inventory");
          }}
        >
          <Text style={styles.buttonText}>I'm Ready!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logoTransparent: {
    width: 81,
    height: 81,
    marginBottom: 20,
  },

  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "4EB46B",
  },
  welcomeMessageText: {
    fontSize: 23,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  questionText: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 90,
  },

  input: {
    width: 350,
    height: 70,
    backgroundColor: "white",
    borderColor: "#4EB46B", // Green outline
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    color: "black",
  },

  button: {
    backgroundColor: "#4EB46B",
    borderRadius: 10,
    width: 273,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
