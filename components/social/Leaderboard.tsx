import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type LeaderboardItem = {
  name: string;
  speciesNum: number;
  isSelf?: boolean;
};

type Leaderboard = {
  pulledData: LeaderboardItem[];
  showDelete?: boolean;
  onDelete?: (name: string) => void;
};

export default function Leaderboard({
  pulledData,
  showDelete = false,
  onDelete,
}: Leaderboard) {
  const sortedData = [...pulledData].sort(
    (a, b) => b.speciesNum - a.speciesNum
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: LeaderboardItem;
    index: number;
  }) => (
    <View
      style={[
        styles.container,
        { backgroundColor: index % 2 === 0 ? colors.gray : colors.background },
      ]}
    >
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>

      <View style={styles.speciesContainer}>
        <Text style={styles.speciesNum}>{item.speciesNum}</Text>
        <Text style={styles.species}> species collected</Text>
      </View>

      {showDelete && !!onDelete && !item.isSelf ? (
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => onDelete(item.name)}
        >
          <MaterialCommunityIcons name="delete-outline" size={30} />
        </TouchableOpacity>
      ) : (
        <View style={styles.deletePlaceholder} />
      )}
    </View>
  );

  return (
    <FlatList
      data={sortedData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    height: 70,
  },
  rank: {
    fontWeight: "bold",
    width: 30,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
    flexShrink: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  speciesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  speciesNum: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 5,
  },
  species: {
    fontSize: 12,
    color: "gray",
  },
  deleteIcon: {
    width: 24,
    marginLeft: 12,
  },
  deletePlaceholder: {
    width: 24,
    height: 24,
    marginLeft: 12,
  },
});
