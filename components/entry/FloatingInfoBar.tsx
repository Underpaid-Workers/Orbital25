import colors from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import InfoCounterBox from "./InfoCounterBox";

interface InfoBar {
  species: number;
  entries: number;
  score: number;
  onClick: () => void;
}

export default function FloatingInfoBar({
  species,
  entries,
  score,
  onClick,
}: InfoBar) {
  return (
    <TouchableOpacity style={styles.bar} onPress={onClick}>
      <InfoCounterBox title="Species" count={species} />
      <InfoCounterBox title="Entries" count={entries} />
      <InfoCounterBox title="Score" count={score} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 16,
    width: "100%",
    borderRadius: 15,
    borderCurve: "circular",
    backgroundColor: colors.primary,
  },
});
