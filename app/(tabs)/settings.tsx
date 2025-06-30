import UsernameModal from "@/components/main/UsernameModal";
import validateTrimmedUsername from "@/hooks/validateTrimmedUsername";
import { useAuthContext } from "@/providers/AuthProvider";
import checkUsername from "@/supabase/auth_hooks/checkUsername";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function settings() {
  const { logOut, fetchUsername, updateUsername, loading } = useAuthContext();

  const [modalVisible, setModalVisible] = useState(false);

  const onUsernameChange = () => {
    setModalVisible(true);
  };

  const onSubmitUsername = async (username: string) => {
    const trimmed = username.trim();
    const validation = validateTrimmedUsername(trimmed);
    if (!validation.success && validation.error) {
      Alert.alert("Username Error", validation.error || "Invalid username");
      return;
    }

    const result = await checkUsername(trimmed);
    if (!result.success) {
      Alert.alert("Username Error", result.message || "Invalid username");
      return;
    }

    updateUsername(username);
    //TODO: Do not display alert when updateUsername error
    if (!loading) {
      Alert.alert("Success", "Display name updated!");
      fetchUsername();
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onUsernameChange}>
        <Text style={styles.changeText}>Change Display Name</Text>
      </TouchableOpacity>

      <UsernameModal
        visible={modalVisible}
        onSubmit={onSubmitUsername}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  text: {
    fontSize: 24,
    color: "#007AFF",
  },
  changeText: {
    fontSize: 24,
    color: "#007AFF",
    marginTop: 8,
  },
});
