import colors from "@/app/theme/colors";
import { StyleSheet, Text, View } from "react-native";

interface dateTimeFormat {
  day: string;
  month: string;
  year: string;
  time: string;
}

export default function DateTimeBox({
  day,
  month,
  year,
  time,
}: dateTimeFormat) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{day}</Text>
      <View style={styles.line} />
      <Text style={styles.text}>{month}</Text>
      <View style={styles.line} />
      <Text style={styles.text}>{year}</Text>
      <View style={styles.line} />
      <Text style={styles.text}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 15,
    borderCurve: "continuous",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  line: {
    height: "100%",
    width: 1,
    backgroundColor: "black",
  },
  text: {
    width: "25%",
    fontSize: 20,
    textAlign: "center",
  },
});
