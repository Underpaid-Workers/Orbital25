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
  //temporary setting for loading state
  const [loading, setLoading] = useState(false);

  //temporary setting for error state
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
            <EntryCard id={item.id} name={item.name} path="" />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});
