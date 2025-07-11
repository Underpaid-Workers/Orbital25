import BadgeCard from "@/components/badges/BadgeCard";
import { useUserdataContext } from "@/providers/UserdataProvider";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function achievements() {
  const { badges, userLoading } = useUserdataContext();
  if (userLoading) {
    return (
      <View style={styles.container}>
        <Text>Nothing to see here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={badges}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={<View style={{ height: 16 }} />}
        renderItem={({ item }) => (
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
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
