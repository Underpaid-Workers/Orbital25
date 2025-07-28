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
  //
  return (
    <View style={styles.card}>
      <View style={{ opacity: current > total && total !== 0 ? 0.3 : 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text
            style={[
              styles.time,
              { color: timeLeft > 60 ? "darkgreen" : "#FF0707" },
            ]}
          >
            {displayTimeLeft} left
          </Text>
        </View>

        <Text style={styles.progressText}>
          {current} / {total}
        </Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { flex: current }]} />
          <View style={{ flex: total - current }} />
        </View>

        <Text style={styles.description}>{description}</Text>
      </View>
      {current > total && total !== 0 ? (
        <View style={styles.completedBox}>
          <Text style={styles.completedText}>Completed!</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
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
    maxWidth: "70%",
    fontSize: 20,
    flexWrap: "wrap",
  },
  time: {
    maxWidth: "30%",
    fontWeight: "bold",
    fontSize: 16,
  },
  progressText: {
    textAlign: "right",
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
  completedBox: {
    zIndex: 100,
    position: "absolute",
    height: "110%",
    width: "110%",
    alignSelf: "center",
    top: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  completedText: {
    fontSize: 28,
    transform: [{ rotate: "-10deg" }],
    color: "red",
  },
});

export default EventCard;
