import EventCard from "@/components/events/EventCard";
import formatDateTimeDifference from "@/hooks/formatDateTimeDifference";
import { useAuthContext } from "@/providers/AuthProvider";
import { useEventsContext } from "@/providers/EventsProvider";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function events() {
  const { session } = useAuthContext();
  const { events, currentTime, getEvents } = useEventsContext();

  useEffect(() => {
    getEvents();
  }, [session]);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={<View style={{ height: 16 }} />}
        renderItem={({ item }) => {
          const differenceInMinutes = formatDateTimeDifference(
            currentTime,
            item.end_time
          );

          if (differenceInMinutes > 0) {
            return (
              <EventCard
                title={item.title}
                timeLeft={differenceInMinutes}
                current={1}
                total={5}
                description={item.description}
              />
            );
          }
          return null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "center",
  },
});
