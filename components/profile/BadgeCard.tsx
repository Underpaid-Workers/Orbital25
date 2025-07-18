import colors from "@/constants/Colors";
import { placeholderImage } from "@/constants/Image";
import formatDateTimeDisplay from "@/hooks/formatDateTimeDisplay";
import { Badge } from "@/supabase/schema";
import { Image, StyleSheet, Text, View } from "react-native";

const BadgeCard = ({
  //TODO: index is an input just to appease the .map function
  name,
  description,
  image_url,
  earned_at,
  badge_type, //id and code are not used atm
}: Badge) => {
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
      <View
        style={{
          height: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {image_url !== "" ? (
          <Image src={image_url} resizeMode="contain" style={styles.image} />
        ) : (
          <Image source={placeholderImage} style={styles.image} />
        )}
      </View>
    </View>
  );
};

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
  image: { height: "80%", aspectRatio: 1 },
});

export default BadgeCard;
