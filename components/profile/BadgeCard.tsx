import colors from "@/constants/Colors";
import formatDateTimeDisplay from "@/hooks/formatDateTimeDisplay";
import { Badge } from "@/supabase/schema";
import { Image, StyleSheet, Text, View } from "react-native";

export default function BadgeCard({
  //TODO: index is an input just to appease the .map function
  name,
  description,
  image_url,
  earned_at,
  badge_type, //id and code are not used atm
}: Badge) {
  return (
    <View style={styles.card}>
      <View
        style={{
          flex: 4,
          paddingRight: 8,
          gap: 8,
        }}
      >
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.earnedAt}>
          Received: {formatDateTimeDisplay(earned_at as string)}
        </Text>
      </View>
      {/* temp image view */}
      <View
        style={{
          height: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={
            "https://plus.unsplash.com/premium_photo-1714138490043-40cbd9d982dc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFkZ2V8ZW58MHx8MHx8fDA%3D"
          }
          style={{
            width: 60,
            height: 60,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    height: 120,
    minWidth: "100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignContent: "space-between",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: 14,
    color: "black",
    flexWrap: "wrap",
  },
  earnedAt: {
    flex: 1,
    verticalAlign: "bottom",
    alignSelf: "baseline",
    fontSize: 14,
    color: "dimgrey",
  },
});
