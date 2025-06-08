import FilterBar from "@/components/maps/FilterBar";
import colors from "@/constants/Colors";
import fetchLocation from "@/hooks/fetchLocation";
import formatDateTimeDisplay from "@/hooks/formatDateTimeDisplay";
import fetchEntriesByLocation, {
  location,
} from "@/supabase/db_hooks/fetchEntriesByLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type marker = {
  datetime: string;
  lat: number;
  long: number;
  name: string;
};

export default function maps() {
  //starter location defaulted to center of Singapore.
  const [currentLocation, setCurrentLocation] = useState<location>({
    lat: 1.3518865175286692,
    long: 103.79266088828444,
  });

  const [data, setData] = useState<marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  let mapRef = React.createRef<MapView | null>();

  const animateToLocation = (pos: location) => {
    mapRef.current?.animateToRegion(
      {
        longitude: pos.long,
        latitude: pos.lat,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      500
    );
  };

  const animateToCurrentLocation = async () => {
    const pos = await fetchLocation();
    if (pos && mapReady) {
      animateToLocation({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    }
  };

  const getMarkers = async () => {
    const updateMarkers = (
      oldMarkers: marker[],
      newMarkers: marker[]
    ): marker[] => {
      const newKeys = new Set<string>(
        newMarkers.map((m) => `${m.lat},${m.long}`)
      );
      const oldKeys = new Set<string>(
        oldMarkers.map((m) => `${m.lat},${m.long}`)
      );
      const fromOld = oldMarkers.filter((m) =>
        newKeys.has(`${m.lat},${m.long}`)
      );
      const fromNew = newMarkers.filter(
        (m) => !oldKeys.has(`${m.lat},${m.long}`)
      );
      return [...fromOld, ...fromNew];
    };
    await fetchEntriesByLocation(currentLocation).then((entries) =>
      setData(updateMarkers(data, entries))
    );
  };

  const showEntryMarkers = () => {
    return data.map((entry, index) => {
      return (
        <Marker
          key={index}
          coordinate={{ latitude: entry.lat, longitude: entry.long }}
          title={entry.name}
          description={"Captured: " + formatDateTimeDisplay(entry.datetime)}
        />
      );
    });
  };

  useFocusEffect(
    useCallback(() => {
      animateToCurrentLocation().finally(() => getMarkers());

      return () => {};
    }, [mapReady])
  );

  // let entryMarkers = [
  //   {
  //     entry_id: 1,
  //     user_id: session?.user.id,
  //     datetime: "2025-06-04 16:22:45",
  //     env_type: "",
  //     species_type: "",
  //     image_url: "photo",
  //     description: "entryMetaData.description",
  //     height: "",
  //     weight: "",
  //     lifespan: "",
  //     observations: "observations",
  //     name: "lizard",
  //     location: "POINT(103.73124634847045 1.3582308673358716)",
  //   },
  //   {
  //     entry_id: 2,
  //     datetime: "2025-06-04 16:22:45",
  //     user_id: session?.user.id,
  //     env_type: "",
  //     species_type: "",
  //     image_url: "photo",
  //     description: "entryMetaData.description",
  //     height: "",
  //     weight: "",
  //     lifespan: "",
  //     observations: "observations",
  //     name: "spider",
  //     location: "POINT(103.74124634847045 1.3382308673358716)",
  //   },
  //   {
  //     entry_id: 3,
  //     user_id: session?.user.id,
  //     datetime: "2025-06-04 16:22:45",
  //     env_type: "",
  //     species_type: "",
  //     image_url: "photo",
  //     description: "entryMetaData.description",
  //     height: "",
  //     weight: "",
  //     lifespan: "",
  //     observations: "observations",
  //     name: "tiger",
  //     location: "POINT(103.78116795793176 1.349923337329362)",
  //   },
  // ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        onRegionChangeComplete={(region) => {
          setCurrentLocation({ lat: region.latitude, long: region.longitude });
          getMarkers();
        }}
        onMapReady={() => setMapReady(true)}
        ref={mapRef}
        initialRegion={{
          latitude: currentLocation.lat,
          latitudeDelta: 0.4,
          longitude: currentLocation.long,
          longitudeDelta: 0.4,
        }}
      >
        {showEntryMarkers()}
      </MapView>
      <View style={styles.filterBar}>
        <FilterBar />
      </View>

      <MaterialCommunityIcons style={styles.crosshair} name="plus" size={20} />
      <TouchableOpacity
        onPress={animateToCurrentLocation}
        style={styles.locationButton}
      >
        <MaterialCommunityIcons name="crosshairs-gps" size={24} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBar: {
    position: "absolute",
    top: 8,
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
  crosshair: {
    position: "absolute",
    left: "50%",
    bottom: "50%",
    transform: [{ translateY: "-50%" }, { translateX: "-50%" }],
  },
  locationButton: {
    position: "absolute",
    right: 16,
    bottom: 70,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    borderCurve: "circular",
    backgroundColor: colors.primary,
  },
});
