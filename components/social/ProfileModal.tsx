import BadgeCard from "@/components/profile/BadgeCard";
import { Badge } from "@/supabase/schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Entry = {
  name: string;
  rarity: string;
  speciesType: string;
  envType: string;
};

type ModalProps = {
  visible: boolean;
  username: string;
  speciesCount: number;
  score: number;
  badges: Badge[];
  recentCaptures: Entry[];
  onClose: () => void;
};

const ProfileModal = ({
  username,
  speciesCount,
  score,
  badges,
  visible,
  onClose,
}: ModalProps) => {
  const [tab, setTab] = useState<"badges" | "recentCaptures">("badges");

  return (
    <Modal
      visible={visible}
      backdropColor={"rgba(0,0,0,0.3)"}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.centered}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.username}>{username}</Text>
          </View>

          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons
              name="account-circle"
              size={80}
              color="black"
            />
          </View>

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

          <View style={styles.tabSelector}>
            <TouchableOpacity
              style={[
                tab === "badges"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
                { borderTopStartRadius: 20, borderBottomStartRadius: 20 },
              ]}
              onPress={() => setTab("badges")}
            >
              <Text
                style={
                  tab === "badges"
                    ? styles.tabTextActive
                    : styles.tabTextInactive
                }
              >
                Badges
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tab === "recentCaptures"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
                { borderTopEndRadius: 20, borderBottomEndRadius: 20 },
              ]}
              onPress={() => setTab("recentCaptures")}
            >
              <Text
                style={
                  tab === "recentCaptures"
                    ? styles.tabTextActive
                    : styles.tabTextInactive
                }
              >
                Recent Captures
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentArea}>
            {tab === "badges"
              ? // <FlatList
                //   data={badges}
                //   keyExtractor={(item) => item.id.toString()}
                //   ItemSeparatorComponent={() => (
                //     <View style={{ borderWidth: 0.5 }} />
                //   )}
                //   renderItem={({ item }) => (
                //     <BadgeCard
                //       name={item.name}
                //       description={item.description}
                //       image_url={item.image_url}
                //       criteria={item.criteria}
                //       earned_at={item.earned_at}
                //       badge_type={item.badge_type}
                //       id={item.id}
                //       code={item.code}
                //     />
                //   )}
                // />
                badges.map((item) => (
                  <BadgeCard
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
              : null}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    marginVertical: "30%",
    width: "90%",
  },
  header: {
    width: "100%",
    height: 150,
    backgroundColor: "rgba(78, 180, 107, 0.5)", // green
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginTop: -40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#A4C9B1",
    borderRadius: 20,
    width: "90%",
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
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 6,
    color: "black",
  },
  dividerLine: { height: "100%", borderWidth: 1, borderColor: "#ccc" },
  tabSelector: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
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
  tabButtonInactive: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonActive: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4EB46B",
  },
  tabTextInactive: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
  },
  tabTextActive: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  contentArea: {
    flex: 1,
    width: "90%",
    backgroundColor: "transparent",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default ProfileModal;
