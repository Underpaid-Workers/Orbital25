import EventCard from "@/components/events/EventCard";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function events() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <EventCard
        title="Explorer's Warm-Up"
        timeLeft="23h"
        current={1}
        total={5}
        description="Log 5 species of any rarity to kickstart your day's discoveries."
      />
      <EventCard
        title="Forest BirdWatch"
        timeLeft="6d21h"
        current={4}
        total={5}
        description="Log 5 distinct bird species in nature reserves (e.g. pink-necked green pigeon, crimson sunbird)."
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
