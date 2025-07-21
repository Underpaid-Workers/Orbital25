import BadgeCard from "@/components/profile/BadgeCard";
import { useUserdataContext } from "@/providers/UserdataProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function profile() {
  const { username, userBadges, speciesCount, score, stats } =
    useUserdataContext();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.avatarContainer}>
        <MaterialCommunityIcons name="account-circle" size={80} color="black" />
      </View>
      <Text style={styles.username}>{username}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={styles.statValue}>{stats.streakDays}</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Stats</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Species Collected</Text>
          <Text style={styles.statValue}>{speciesCount}</Text>
        </View>
        <View style={styles.dividerLine}></View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Score</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Animals Captured</Text>
          <Text style={styles.statValue}>{stats.speciesType.animal}</Text>
        </View>
        <View style={styles.dividerLine}></View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Plants Captured</Text>
          <Text style={styles.statValue}>{stats.speciesType.plant}</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Badges</Text>

      {userBadges.length <= 0 ? (
        <Text style={styles.statLabel}>
          Collect more badges to see them here!
        </Text>
      ) : (
        userBadges.map((item, index) => (
          <BadgeCard
            key={index}
            name={item.name}
            description={item.description}
            image_url={item.image_url}
            criteria={item.criteria}
            earned_at={item.earned_at}
            badge_type={item.badge_type}
            id={item.id}
            code={item.code}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D9D9D9" },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingTop: 32,
    paddingBottom: 50,
    gap: 20,
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
    maxWidth: "90%",
    textAlign: "center",
    textAlignVertical: "center",
    flexWrap: "wrap",
    color: "black",
  },
  avatarContainer: {
    backgroundColor: "white",
    borderRadius: "100%",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#A4C9B1",
    borderRadius: 20,
    width: "100%",
    height: 90,
    justifyContent: "space-around",
    alignItems: "center",
  },
  statBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    textAlignVertical: "center",
    flexWrap: "wrap",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 6,
    color: "black",
  },
  dividerLine: { height: "100%", borderWidth: 1, borderColor: "#ccc" },
});
