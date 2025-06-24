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

type RarityLeaderboardItem = {
  name: string;
  rarityScore: number;
  isSelf?: boolean;
};

type RarityLeaderboard = {
  pulledData: RarityLeaderboardItem[];
  showDelete?: boolean;
  onDelete?: (name: string) => void;
};

export default function RarityLeaderboard({
  pulledData,
  showDelete = false,
  onDelete,
}: RarityLeaderboard) {
  const sortedData = [...pulledData].sort(
    (a, b) => b.rarityScore - a.rarityScore
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: RarityLeaderboardItem;
    index: number;
  }) => (
    <View
      style={[
        styles.container,
        { backgroundColor: index % 2 === 0 ? "D9D9D9" : colors.background },
      ]}
    >
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>

      <View style={styles.speciesContainer}>
        <Text style={styles.score}>{item.rarityScore}</Text>
        <Text style={styles.rarityScore}>rarity score</Text>
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
  score: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 5,
  },
  rarityScore: {
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