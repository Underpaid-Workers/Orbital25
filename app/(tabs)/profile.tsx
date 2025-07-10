import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

export default function Profile() {
  const [tab, setTab] = useState<"badges" | "topCaptures">("badges");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeIcon} onPress = {() => router.back()}>
          <MaterialCommunityIcons name="close" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.username}>天黑黑</Text>
      </View>

      <View style={styles.avatarContainer}>
        <MaterialCommunityIcons name="account-circle" size={80} color="black" />
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { borderRightWidth: 1, borderRightColor: "#ccc" }]}>
          <Text style={styles.statLabel}>Species Collected</Text>
          <Text style={styles.statValue}>67</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Rarity Score</Text>
          <Text style={styles.statValue}>2358</Text>
        </View>
      </View>

      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[styles.tabButton, tab === "badges" && styles.tabButtonActive]}
          onPress={() => setTab("badges")}
        >
          <Text style={[styles.tabText, tab === "badges" && styles.tabTextActive]}>Badges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === "topCaptures" && styles.tabButtonActive]}
          onPress={() => setTab("topCaptures")}
        >
          <Text style={[styles.tabText, tab === "topCaptures" && styles.tabTextActive]}>
            Top Captures
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content area(EMPTY FOR NOW)*/}
      <View style={styles.contentArea}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
  },
  header: {
    width: width,
    height: 150,
    backgroundColor: "rgba(78, 180, 107, 0.5)", // green
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  username: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 30,
    color: "black",
  },
  avatarContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 4,
    marginTop: -40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#A4C9B1",
    borderRadius: 20,
    width: width * 0.9,
    height: 90,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  statLabel: {
    fontSize: 14,
    color: "#333",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 6,
    color: "black",
  },
  tabSelector: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    width: width * 0.9,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  tabButtonActive: {
    backgroundColor: "#4EB46B",
  },
  tabText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
  },
  tabTextActive: {
    color: "white",
  },
  contentArea: {
    flex: 1,
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
