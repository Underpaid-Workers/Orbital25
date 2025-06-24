import RarityLeaderboard from "@/components/social/RarityLeaderboard";
import SpeciesLeaderboard from "@/components/social/SpeciesLeaderboard";
import colors from "@/constants/Colors";
import addFriend from "@/supabase/social_hooks/addFriend";
import { fetchFriendsRarity, fetchFriendsSpecies } from "@/supabase/social_hooks/fetchFriends";
import { getRarityData, getSpeciesData } from "@/supabase/social_hooks/fetchLeaderboard";
import removeFriend from "@/supabase/social_hooks/removeFriend";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function social() {
  const [board, setBoard] = useState<1 | 2>(1);
  const [searchInput, setSearchInput] = useState("");
  const [showRarity, setShowRarity] = useState(false);

  const [speciesLeaderboardData, setSpeciesLeaderboardData] = useState<{ name: string; speciesNum: number }[]>([]);
  const [rarityLeaderboardData, setRarityLeaderboardData] = useState<{ name: string; rarityScore: number }[]>([]);
  const [friendsListSpecies, setFriendsListSpecies] = useState<{ name: string; speciesNum: number }[]>([]);
  const [friendsListRarity, setFriendsListRarity] = useState<{ name: string; rarityScore: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [species, rarity] = await Promise.all([getSpeciesData(), getRarityData()]);
      setSpeciesLeaderboardData(species);
      setRarityLeaderboardData(rarity);
    };

    fetchData();
    refreshFriends();
  }, []);

  const refreshFriends = async () => {
    const [species, rarity] = await Promise.all([fetchFriendsSpecies(), fetchFriendsRarity()]);
    setFriendsListSpecies(species);
    setFriendsListRarity(rarity);
  };

  const searchFriendsData = showRarity ? rarityLeaderboardData : speciesLeaderboardData;

  const filteredFriends = searchFriendsData.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      !(showRarity
        ? friendsListRarity.some((f) => f.name === friend.name)
        : friendsListSpecies.some((f) => f.name === friend.name))
  );

  const handleAddFriend = async (friendToAdd: { name: string; speciesNum?: number; rarityScore?: number }) => {
    const response = await addFriend(friendToAdd.name);
    if (response.success) {
      await refreshFriends();
      setSearchInput("");
      Alert.alert("Friend added!");
    } else {
      Alert.alert("Error", response.message);
    }
  };

  const deleteFriend = (friendName: string) => {
    Alert.alert(
      "Confirm Removal",
      `Are you sure you want to remove ${friendName} from your friends list?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            const response = await removeFriend(friendName);
            if (response.success) {
              await refreshFriends();
              Alert.alert("Removed", `${friendName} has been removed from your friends`);
            } else {
              Alert.alert("Error", response.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, board === 1 ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setBoard(1)}
        >
          <Text style={styles.buttonText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, board === 2 ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setBoard(2)}
        >
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {board === 1 ? (
        <View style={styles.friendContainer}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchBar}
              placeholder={`Add new friends...`}
              placeholderTextColor={"gray"}
              value={searchInput}
              onChangeText={setSearchInput}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowRarity((prev) => !prev)}
              accessibilityLabel="Toggle leaderboard type"
            >
              <MaterialCommunityIcons name="swap-horizontal" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            {searchInput.trim().length === 0 ? (
              showRarity ? (
                <RarityLeaderboard pulledData={friendsListRarity} showDelete onDelete={deleteFriend} />
              ) : (
                <SpeciesLeaderboard pulledData={friendsListSpecies} showDelete onDelete={deleteFriend} />
              )
            ) : (
              <View style={styles.resultsContainer}>
                {filteredFriends.map((friend, index) => (
                  <View key={index} style={styles.friendRow}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    <TouchableOpacity
                      style={styles.addFriendButton}
                      onPress={() => handleAddFriend(friend)}
                    >
                      <Text style={styles.addFriendButtonText}>Add Friend</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      ) : showRarity ? (
        <RarityLeaderboard pulledData={rarityLeaderboardData} />
      ) : (
        <SpeciesLeaderboard pulledData={speciesLeaderboardData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 30,
  },
  activeButton: { 
    backgroundColor: colors.primary 
  },
  inactiveButton: { 
    backgroundColor: "rgba(78, 180, 107, 0.3)" 
  },
  button: {
    borderRadius: 10,
    width: 165,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: { 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  friendContainer: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  searchBar: {
    flex: 1,
    height: 45,
    backgroundColor: "rgba(78, 180, 107, 0.3)",
    paddingHorizontal: 12,
    fontSize: 16,
    color: "black",
    borderRadius: 10,
  },
  iconButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: { 
    flex: 1, 
    width: "100%" 
  },
  resultsContainer: { 
    alignItems: "center" 
  },
  friendRow: {
    width: "100%",
    height: 85,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  friendName: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginLeft: 30 
  },
  addFriendButton: {
    backgroundColor: "#4EB46B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addFriendButtonText: { 
    color: "black", 
    fontWeight: "bold" 
  },
});

