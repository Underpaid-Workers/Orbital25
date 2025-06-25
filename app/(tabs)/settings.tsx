import UsernameModal from "@/components/entry/UsernameModal";
import { useAuthContext } from "@/providers/AuthProvider";
import { useUsernameCheck } from "@/supabase/auth_hooks/usernameCheck";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function settings() {
  const { logOut } = useAuthContext();
  const { validateDisplayName, saveDisplayName } = useUsernameCheck();

  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeDisplayName = () => {
    setModalVisible(true);
  };

  const handleSubmit = async (username: string) => {
    const validation = await validateDisplayName(username);
    if (!validation.success) {
      Alert.alert("Username Error", validation.error || "Invalid username");
      return;
    }

    const result = await saveDisplayName(username);
    if (!result.success) {
      Alert.alert("Username Error", result.error || "Failed to save username");
      return;
    }

    Alert.alert("Success", "Display name updated!");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleChangeDisplayName}>
        <Text style={styles.changeText}>Change Display Name</Text>
      </TouchableOpacity>

      <UsernameModal visible={modalVisible} onSubmit={handleSubmit} />
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

