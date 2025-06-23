import colors from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import InfoCounterBox from "./InfoCounterBox";

interface Info {
  species: number;
  entries: number;
  score: number;
}

export default function FloatingInfoBar({ species, entries, score }: Info) {
  return (
    <View style={styles.bar}>
      <InfoCounterBox title="Species" count={species} />
      <InfoCounterBox title="Entries" count={entries} />
      <InfoCounterBox title="Score" count={score} />
    </View>
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
