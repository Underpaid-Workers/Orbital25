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

      <Text style={styles.welcomeText}>Welcome Back!</Text>

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../(tabs)/inventory")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Link href="/(auth)/signup">
        <Text style={{ textDecorationLine: "underline" }}>
          Don't have an account? Sign up here.
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
    marginBottom: 30,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "semibold",
    marginBottom: 30,
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
