import EventCard from "@/components/events/EventCard";
import colors from "@/constants/Colors";
import formatDateTimeDifference from "@/hooks/formatDateTimeDifference";
import { useAuthContext } from "@/providers/AuthProvider";
import { useEventsContext } from "@/providers/EventsProvider";
import { Event } from "@/supabase/schema";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function events() {
  const { session } = useAuthContext();
  const { events, currentTime, getEvents } = useEventsContext();

  useEffect(() => {
    getEvents();
  }, [session]);

  let dailies: Event[] = [];
  let weeklies: Event[] = [];
  let monthlies: Event[] = [];
  events.map((e) => {
    switch (e.frequency) {
      case "daily":
        dailies.push(e);
        break;
      case "weekly":
        weeklies.push(e);
        break;
      case "monthly":
        monthlies.push(e);
        break;
      default:
        break;
    }
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <Text style={styles.sectionTitle}>Daily Challenges</Text>
      {dailies.length > 0 ? (
        dailies.map((event, index) => {
          const differenceInMinutes = formatDateTimeDifference(
            currentTime,
            event.end_time
          );

          if (differenceInMinutes > 0) {
            return (
              <EventCard
                key={index}
                title={event.title}
                timeLeft={differenceInMinutes}
                current={event.current}
                total={event.total}
                description={event.description}
              />
            );
          }
          return null;
        })
      ) : (
        <Text>None at the moment.</Text>
      )}
      <Text style={styles.sectionTitle}>Weekly Challenges</Text>
      {weeklies.length > 0 ? (
        weeklies.map((event, index) => {
          const differenceInMinutes = formatDateTimeDifference(
            currentTime,
            event.end_time
          );
          if (differenceInMinutes > 0) {
            return (
              <EventCard
                key={index}
                title={event.title}
                timeLeft={differenceInMinutes}
                current={event.current}
                total={event.total}
                description={event.description}
              />
            );
          }
          return null;
        })
      ) : (
        <Text>None at the moment.</Text>
      )}
      <Text style={styles.sectionTitle}>Monthly Challenges</Text>
      {monthlies.length > 0 ? (
        monthlies.map((event, index) => {
          const differenceInMinutes = formatDateTimeDifference(
            currentTime,
            event.end_time
          );
          if (differenceInMinutes > 0) {
            return (
              <EventCard
                key={index}
                title={event.title}
                timeLeft={differenceInMinutes}
                current={event.current}
                total={event.total}
                description={event.description}
              />
            );
          }
          return null;
        })
      ) : (
        <Text>None at the moment.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContainer: { alignItems: "center", gap: 16, paddingBottom: 80 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    padding: 4,
  },
});
