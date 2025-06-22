import * as Location from "expo-location";

/**
 * @description Get location from device, dependant on Foreground Location Permission
 * @params none
 * @returns Promise<Location.LocationObject | null>
 */
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
