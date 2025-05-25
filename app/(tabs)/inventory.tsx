import EntryCard from "@/app/components/entry/EntryCard";
import useEntryDataContext from "@/app/hooks/useEntryDataContext";
import colors from "@/app/theme/colors";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function inventory() {
  //temporary setting for loading state
  const [loading, setLoading] = useState(false);
  const entryData = useEntryDataContext();

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
          data={entryData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EntryCard id={item.id} name={item.name} image={item.image} />
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
