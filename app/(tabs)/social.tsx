import Leaderboard from "@/components/entry/Leaderboard";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// delete later
const mockData2 = [
  { name: "Tung Tung Tung Tung Tung Tung Sahur", speciesNum: 2312 },
  { name: "Bombardilo Crocadilo", speciesNum: 2047 },
  { name: "Chimpanzini Bananini", speciesNum: 1877 },
  { name: "Lirili Larila", speciesNum: 1564 },
  { name: "Cappuccino Assassino", speciesNum: 1499 },
  { name: "Trippi Troppi", speciesNum: 1478 },
  { name: "Linganguli", speciesNum: 1466 },
  { name: "Don Pollo", speciesNum: 1454 },
];

const searchFriendsData = [
  { name: "wazaaaaaaa.001", speciesNum: 1234 },
  { name: "wazaaaaaaa.002", speciesNum: 354 },
  { name: "wazaaaaaaa.003", speciesNum: 762 },
  { name: "wazaaaaaaa.004", speciesNum: 888 },
];

const Social = () => {
  const [board, setBoard] = useState<1 | 2>(1);
  const [searchInput, setSearchInput] = useState("");

  const [friendsList, setFriendsList] = useState([
    { name: "Rong Kang", speciesNum: 35 },
    { name: "Joses", speciesNum: 26 },
    { name: "Siao Shiuan", speciesNum: 17 },
    { name: "Andy", speciesNum: 14 },
    { name: "Javier", speciesNum: 9 },
    { name: "Yao Hui", speciesNum: 2 },
    { name: "Tze Ray", speciesNum: 0 },
  ]);

  const filteredFriends = searchFriendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchInput.toLowerCase()) &&
    !friendsList.some((f) => f.name === friend.name)
  );

  const handleAddFriend = (friendToAdd: { name: string; speciesNum: number }) => {
    setFriendsList((prev) => [...prev, friendToAdd]);
    Alert.alert("Friend added!");
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
              <Leaderboard pulledData={friendsList} />
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
        <Leaderboard pulledData={mockData2} />
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
