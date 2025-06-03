import { useAuthContext } from "@/providers/AuthProvider";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function settings() {
  const { logOut } = useAuthContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});
