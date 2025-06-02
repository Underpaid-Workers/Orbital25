import signOut from "@/supabase/auth_hooks/signOut";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function settings() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut}>
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
