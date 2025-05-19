import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EntryCard from "../components/EntryCard";
import data from "../testData/data";
import colors from "../theme/colors";

export default function inventory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const errorMessage = <Text>Error : Unable to load</Text>;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{ alignContent: "center" }}
          size="large"
          color={colors.tabBar}
        />
      ) : error ? (
        errorMessage
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <EntryCard id={item.id} name={item.name} path="" />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
  },
});
