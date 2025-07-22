import BadgeCard from "@/components/profile/BadgeCard";
import sortBadges from "@/hooks/sortBadges";
import fetchAllUserBadges from "@/supabase/progression_hooks/fetchAllUserBadges";
import { Badge, Stats } from "@/supabase/schema";
import fetchUserdata from "@/supabase/social_hooks/fetchUserdata";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

type OtherUserProfileProps = {
  userId: string;
};

export default function OtherUserProfile({ userId }: OtherUserProfileProps) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [speciesCount, setSpeciesCount] = useState(0);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState<Stats>({
    streakDays: 0,
    rarity: {
      common: 0,
      uncommon: 0,
      rare: 0,
      "very rare": 0,
      unique: 0,
    },
    envType: {
      aquatic: 0,
      terrestrial: 0,
      flying: 0,
    },
    speciesType: {
      animal: 0,
      plant: 0,
    },
    habitat: {
      forest: 0,
      grassland: 0,
      wetland: 0,
      desert: 0,
      mountains: 0,
      coastal: 0,
      oceanic: 0,
      freshwater: 0,
      urban: 0,
      caves: 0,
      tundra: 0,
    },
  });
  const [userBadges, setUserBadges] = useState<Badge[]>([]);

  const fetchOtherUserData = () => {
    setLoading(true);
    fetchUserdata(userId)
      .then((response) => {
        if (response.success) {
          const user = response.data;
          setUsername(user.username);
          setSpeciesCount(user.speciescount);
          setScore(user.score);
          setStats(user.stats);
        } else {
          Alert.alert("Error fetching user data", response.message);
        }
      })
      .catch((err) => {
        Alert.alert("Error fetching user data", err.message);
      })
      .finally(() => setLoading(false));
  };

  const fetchOtherUserBadges = () => {
    fetchAllUserBadges(userId)
      .then((response) => {
        if (response.success) {
          const sortedBadges = sortBadges(response.data);
          const earnedBadges = sortedBadges.filter((b) => b.earned_at);
          setUserBadges(earnedBadges);
        } else {
          Alert.alert("Error fetching badges", response.message);
        }
      })
      .catch((err) => {
        Alert.alert("Error fetching badges", err.message);
      });
  };

  useEffect(() => {
    fetchOtherUserData();
    fetchOtherUserBadges();
  }, [userId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
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
        <Text style={styles.statLabel}>Collect more badges to see them here!</Text>
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
    borderRadius: 9999,
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
