import * as Location from "expo-location";

export default async function fetchLocation(): Promise<Location.LocationObject | null> {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permission was denied!");
    } else {
      const location = await Location.getLastKnownPositionAsync({});
      if (location) {
        console.log("Location fetched");
        return location;
      }
    }
  } catch (error) {
    console.warn("Error fetching location");
  }
  return null;
}
