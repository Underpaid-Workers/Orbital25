import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function maps() {
  type entry = {
    entryName: string;
    location: { latitude: number; longitude: number };
    captured: string;
  };
  let entryMarkers: entry[] = [
    {
      entryName: "lizard",
      location: { latitude: 1.3582308673358716, longitude: 103.73124634847045 },
      captured: "02/05/2025, 12:44 PM",
    },
    {
      entryName: "spider",
      location: { latitude: 1.3382308673358716, longitude: 103.74124634847045 },
      captured: "01/03/2025, 9:10 AM",
    },
    {
      entryName: "tiger",
      location: { latitude: 1.349923337329362, longitude: 103.78116795793176 },
      captured: "02/06/2025, 12:35 PM",
    },
  ];

  const showEntryMarkers = () => {
    return entryMarkers.map((entry, index) => {
      return (
        <Marker
          key={index}
          coordinate={entry.location}
          title={entry.entryName}
          description={"Captured: " + entry.captured}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        onRegionChangeComplete={(region) => console.log(region)}
        initialRegion={{
          latitude: 1.3502649043052042,
          latitudeDelta: 0.13305053778058062,
          longitude: 103.76391230151057,
          longitudeDelta: 0.07468711584806442,
        }}
      >
        {showEntryMarkers()}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
});
