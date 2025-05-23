import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function signup() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/custom icons/LogoTransparent.png")}
        style={styles.logoTransparent}
      />
      <Text style={styles.ecodexText}>EcoDex</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../(tabs)/inventory")}
      >
        <Text style={styles.buttonText}>Create an Account</Text>
      </TouchableOpacity>

      <Link href="/(auth)/login">
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
