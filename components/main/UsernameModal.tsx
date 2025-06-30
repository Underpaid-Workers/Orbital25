import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onSubmit: (username: string) => Promise<void>;
  onClose: () => void;
};

export default function UsernameModal({ visible, onSubmit, onClose }: Props) {
  const [input, setInput] = useState("");

  const handleSave = async () => {
    const trimmed = input.trim();
    await onSubmit(trimmed);
    setInput("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Enter a username:</Text>
          <TextInput
            placeholder="Username"
            value={input}
            onChangeText={setInput}
            maxLength={20}
            style={styles.input}
          />
          <Button title="Save Username" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
});
