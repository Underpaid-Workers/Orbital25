import { StyleSheet, Text, View } from "react-native";

interface Counter {
  count: number;
  title: string;
}

export default function InfoCounterBox({ count, title }: Counter) {
  return (
    <View style={styles.box}>
      <Text style={styles.countText}>{count}</Text>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  countText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 6,
  },
  titleText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});
