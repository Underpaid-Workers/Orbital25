import Leaderboard from "@/components/entry/Leaderboard";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//delete later
const mockData1 = [
  { name: 'Rong Kang', speciesNum: 35 },
  { name: 'Joses', speciesNum: 26 },
  { name: 'Siao Shiuan', speciesNum: 17 },
  { name: 'Andy', speciesNum: 14 },
  { name: 'Javier', speciesNum: 9 },
  { name: 'Yao Hui', speciesNum: 2 },
  { name: 'Tze Ray', speciesNum: 0 },
];

const mockData2 = [
  { name: 'Tung Tung Tung Tung Tung Tung Sahur', speciesNum: 2312 },
  { name: 'Bombardilo Crocadilo', speciesNum: 2047 },
  { name: 'Chimpanzini Bananini', speciesNum: 1877 },
  { name: 'Lirili Larila', speciesNum: 1564 },
  { name: 'Cappuccino Assassino', speciesNum: 1499 },
  { name: 'Trippi Troppi', speciesNum: 1478 },
  { name: 'Linganguli', speciesNum: 1466 },
  { name: 'Don Pollo', speciesNum: 1454},
];
const social = () => {
  const [board, setBoard] = useState< 1 | 2>(1);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => setBoard(1)}>
          <Text style={styles.buttonText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setBoard(2)}>
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {board === 1 ? (
        <Leaderboard pulledData={mockData1} />
      ): (
        <Leaderboard pulledData={mockData2} />
      )
      }
    </View>
  );
};

export default social;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 30,
  },
  button: {
    backgroundColor: "#4EB46B",
    borderRadius: 10,
    width: 165,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
