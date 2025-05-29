import signUp from "@/supabase/auth_hooks/signUp";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onBegin = () => {
    setLoading(true);
  };

  const onComplete = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/custom_icons/LogoTransparent.png")}
        style={styles.logoTransparent}
      />
      <Text style={styles.ecodexText}>EcoDex</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          placeholderTextColor="#999"
        />
      </View>

      {/* Temp removal of confirm password container */}
      {/* <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
        />
      </View> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => signUp(email, password, onBegin, onComplete)}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating an Account..." : "Create an Account"}
        </Text>
      </TouchableOpacity>

      <Link replace href="/(auth)/login" disabled={loading}>
        <Text style={{ textDecorationLine: "underline" }}>
          Already have an account? Log in here.
        </Text>
      </Link>
    </View>
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

  ecodexText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "4EB46B",
  },

  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
  },

  headerText: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 5,
    marginLeft: 5,
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
    marginBottom: 10,
    marginTop: 40,
  },

  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
