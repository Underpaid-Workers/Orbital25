import FilterBar from "@/components/maps/FilterBar";
import colors from "@/constants/Colors";
import fetchLocation from "@/hooks/fetchLocation";
import formatDateTimeDisplay from "@/hooks/formatDateTimeDisplay";
import { useAuthContext } from "@/providers/AuthProvider";
import fetchGlobalEntriesByLocation, {
  location,
} from "@/supabase/db_hooks/fetchGlobalEntriesByLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type marker = {
  name: string;
  datetime: string;
  rarity: string;
  species_type: string;
  env_type: string;
  lat: number;
  long: number;
};

export default function maps() {
  const { session } = useAuthContext();
  //starter location defaulted to center of Singapore.
  const [currentLocation, setCurrentLocation] = useState<location>({
    lat: 1.3518865175286692,
    long: 103.79266088828444,
  });

  //Map and markers
  const [data, setData] = useState<marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  let mapRef = React.createRef<MapView | null>();

  //Filters
  const [filterRarity, setFilterRarity] = useState<string>("");
  const [filterSpecies, setFilterSpecies] = useState<string>("");
  const [filterEnv, setFilterEnv] = useState<string>("");
  const [filterUser, setFilterUser] = useState<boolean>(true);

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

    if (filterUser) {
      console.log("Filtering by user");
    } else {
      console.log("Filtering by global");
    }
    await fetchGlobalEntriesByLocation(
      currentLocation,
      filterUser,
      session
    ).then((entries) => {
      const result = updateMarkers(data, entries);
      console.log(`${result.length} entries fetched`);
      let filteredResult = result;
      if (filterRarity !== "") {
        console.log(`${filterRarity} filtered`);
        filteredResult = filteredResult.filter(
          (entry) => entry.rarity === filterRarity
        );
      }
      if (filterSpecies !== "") {
        console.log(`${filterSpecies} filtered`);
        filteredResult = filteredResult.filter(
          (entry) => entry.species_type === filterSpecies
        );
      }
      if (filterEnv !== "") {
        console.log(`${filterEnv} filtered`);
        filteredResult = filteredResult.filter(
          (entry) => entry.env_type === filterEnv
        );
      }
      console.log(`${filteredResult.length} entries left after filter`);
      setData(filteredResult);
    });
  };

  const showEntryMarkers = () => {
    return data.map((entry, index) => {
      return (
        <Marker
          key={index}
          coordinate={{ latitude: entry.lat, longitude: entry.long }}
          title={entry.name}
          description={`Captured: ${formatDateTimeDisplay(entry.datetime)}`}
        >
          {/* TODO: Callout does not work as intended as of now, due to EXPO and react-native-maps package compatibility issues
          Currently only can display capture time and name, until fix/workaround made to display custom callout */}
          {/* <View style={{ width: 100, height: 100 }}>
            <Text>{entry.name}</Text>
            <Text>
              Captured: {formatDateTimeDisplay(entry.datetime)}
              Rarity: {entry.rarity}
              Species: {entry.species_type}
              Environment: {entry.env_type}
            </Text>
          </View> */}
        </Marker>
      );
    });
  };

  useFocusEffect(
    useCallback(() => {
      animateToCurrentLocation().finally(() => getMarkers());

      return () => {};
    }, [mapReady])
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        provider={PROVIDER_GOOGLE}
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
        <FilterBar
          filterRarity={(rarity) => {
            setFilterRarity(rarity);
            getMarkers();
          }}
          filterSpecies={(species) => {
            setFilterSpecies(species);
            getMarkers();
          }}
          filterEnv={(env) => {
            setFilterEnv(env);
            getMarkers();
          }}
          filterReset={() => {
            setFilterRarity("");
            setFilterSpecies("");
            setFilterEnv("");
            getMarkers();
          }}
        />
      </View>

      <MaterialCommunityIcons style={styles.crosshair} name="plus" size={20} />
      <TouchableOpacity
        onPress={animateToCurrentLocation}
        style={styles.locationButton}
      >
        <MaterialCommunityIcons name="crosshairs-gps" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setFilterUser(!filterUser);
          getMarkers();
        }}
        style={styles.userOrGlobaltoggle}
      >
        <Text>{filterUser ? "Your Entries" : "Global Entries"}</Text>
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
    paddingHorizontal: 35,
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
    bottom: 80,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    borderCurve: "circular",
    backgroundColor: colors.primary,
  },
  userOrGlobaltoggle: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 120,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
});
