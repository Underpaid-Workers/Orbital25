import Leaderboard from "@/components/entry/Leaderboard";
import { addFriend } from "@/supabase/social_hooks/addFriend";
import { fetchFriends } from "@/supabase/social_hooks/fetchFriends";
import { getLeaderboardData } from "@/supabase/social_hooks/fetchLeaderboard";
import { removeFriend } from "@/supabase/social_hooks/removeFriend";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Social = () => {
  const [board, setBoard] = useState<1 | 2>(1);
  const [searchInput, setSearchInput] = useState("");

  const [leaderboardData, setLeaderboardData] = useState<{ name: string; speciesNum: number }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeaderboardData();
      setLeaderboardData(data);
    };

    fetchData();
  }, []);

  const searchFriendsData = leaderboardData;

  const { friends, loading } = fetchFriends();
  const [friendsList, setFriendsList] = useState<{ name: string; speciesNum: number}[]>([]);

  useEffect(() => {
    if (!loading) {
      setFriendsList(friends);
    }
  }, [loading, friends]);

  const filteredFriends = searchFriendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchInput.toLowerCase()) &&
    !friendsList.some((f) => f.name === friend.name)
  );

  const handleAddFriend = async (friendToAdd: { name: string; speciesNum: number }) => {
    const response = await addFriend(friendToAdd.name); 
    if (response.success) {
      setFriendsList((prev) => [...prev, friendToAdd]);
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
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const response = await removeFriend(friendName);
          if (response.success) {
            setFriendsList(prev => prev.filter(f => f.name !== friendName));
            Alert.alert("Removed", `${friendName} has been removed from your friends`);
          } else {
            Alert.alert("Error", response.message);
          }
        },
        style: "destructive",
      },
    ],
    { cancelable: true }
  );
};



  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            board === 1 ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setBoard(1)}
        >
          <Text style={styles.buttonText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            board === 2 ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setBoard(2)}
        >
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {board === 1 ? (
        <View style={styles.friendContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Add new friend..."
            value={searchInput}
            onChangeText={setSearchInput}
          />
          <View style={styles.searchContainer}>
            {searchInput.trim().length === 0 ? (
              <Leaderboard 
              pulledData={friendsList}
              showDelete
              onDelete={deleteFriend}
              />
            ) : (
              <View style={styles.resultsContainer}>
                {filteredFriends.map((friend, index) => (
                  <View key={index} style={styles.friendRow}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    <TouchableOpacity style={styles.addFriendButton}
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
      ) : (
        <Leaderboard pulledData={leaderboardData} />
      )}
    </View>
  );
};

export default Social;

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
  activeButton: {
    backgroundColor: "rgba(78, 180, 107, 1)",
  },
  inactiveButton: {
    backgroundColor: "rgba(78, 180, 107, 0.3)",
  },
  button: {
    backgroundColor: "#4EB46B",
    borderRadius: 10,
    width: 165,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  friendContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    width: 350,
    height: 45,
    backgroundColor: "rgba(78, 180, 107, 0.3)",
    paddingHorizontal: 5,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    borderRadius: 10,
  },
  friendRow: {
    width: '100%',
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
    marginLeft: 30,
  },
  addFriendButton: {
    backgroundColor: "#4EB46B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addedFriendButton: {
    backgroundColor: "rgba(78, 180, 107, 0.3)",
  },
  addFriendButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  searchContainer: {
    flex: 1,
    width: '100%',
  },
  resultsContainer: {
    alignItems: 'center',
  },
});
