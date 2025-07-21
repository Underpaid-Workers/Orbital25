import UsernameModal from "@/components/main/UsernameModal";
import { useAuthContext } from "@/providers/AuthProvider";
import { useUserdataContext } from "@/providers/UserdataProvider";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function settings() {
  const { logOut, removeAccount, loading } = useAuthContext();

  const { updateUsername } = useUserdataContext();

  const [modalVisible, setModalVisible] = useState(false);

  const onUsernameChange = () => {
    setModalVisible(true);
  };

  const onSubmitUsername = (username: string) => {
    const onFail = () => {};
    const onSuccess = () => {
      setModalVisible(false);
    };
    updateUsername(username, onFail, onSuccess);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onUsernameChange}>
        <Text style={styles.changeText}>Change Display Name</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
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
    gap: 24,
  },
  text: {
    fontSize: 24,
    color: "#007AFF",
  },
  changeText: {
    fontSize: 24,
    color: "#007AFF",
  },
  deleteText: {
    fontSize: 24,
    color: "#C70000",
    fontWeight: "bold",
  },
});
