import { loginImage, logoTransparent } from "@/constants/Image";
import { Link, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={logoTransparent} style={styles.logoTransparent} />
      <Text style={styles.text}>EcoDex</Text>
      <Image source={loginImage} style={styles.loginImage} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Link href="/(auth)/signup">
        <Text style={{ textDecorationLine: "underline" }}>
          Don't have an account? Sign up here
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

  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "4EB46B",
  },

  loginImage: {
    width: 345,
    height: 345,
  },

  button: {
    backgroundColor: "#4EB46B",
    borderRadius: 10,
    width: 273,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
