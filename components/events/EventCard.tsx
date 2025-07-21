import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EventParams = {
  title: string;
  timeLeft: number;
  current: number;
  total: number;
  description: string;
};

const EventCard = ({
  title,
  timeLeft,
  current,
  total,
  description,
}: EventParams) => {
  const progress = current / total;
  const days = Math.floor(timeLeft / (24 * 60));
  let remaining = timeLeft % (24 * 60);
  const hours = Math.floor(remaining / 60);
  remaining = remaining % 60;
  const minutes = Math.floor(remaining);
  const displayTimeLeft =
    days > 0
      ? `${days}D ${hours}H`
      : hours > 0
      ? `${hours}H ${minutes}M`
      : `${minutes}M`;
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{displayTimeLeft} left</Text>
      </View>

      <Text style={styles.progressText}>{`${current}/${total} captured`}</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E9F9EC",
    borderRadius: 12,
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  time: {
    color: "#FF0707",
    fontWeight: "600",
    fontSize: 16,
  },
  progressText: {
    fontSize: 12,
    marginBottom: 4,
    color: "#4EB46B",
  },
  progressBar: {
    flexDirection: "row",
    height: 20,
    backgroundColor: "#CFEAD4",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    backgroundColor: "#72C38F",
  },
  description: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
});

export default EventCard;
