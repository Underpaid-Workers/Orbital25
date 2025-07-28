import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";

const NewBadgePopup = ({
  isVisible,
  onDismiss,
  badgeCount,
}: {
  isVisible: boolean;
  onDismiss: () => void;
  badgeCount: number;
}) => {
  const router = useRouter();
  return (
    //using double TouchableOpacity as a workaround for allowing click to
    //dismiss outside of modal
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableOpacity
        style={styles.background}
        activeOpacity={1}
        onPressOut={() => onDismiss()}
      >
        <TouchableOpacity style={styles.content} activeOpacity={1}>
          <Text style={styles.text}>{badgeCount} badges earned!</Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(tabs)/profile");
              onDismiss();
            }}
          >
            <Text style={styles.link}>Check Profile</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 0.15,
    width: 300,
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default NewBadgePopup;
