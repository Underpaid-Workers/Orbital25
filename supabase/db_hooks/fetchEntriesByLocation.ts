import supabase from "@/supabase/main";

export default async function fetchEntriesByLocation(currLocation: location) {
  const markerRenderDistance = 0.5;
  const { data, error } = await supabase
    .schema("public")
    .rpc("entrys_in_view", {
      min_lat: currLocation.lat - markerRenderDistance,
      min_long: currLocation.long - markerRenderDistance,
      max_lat: currLocation.lat + markerRenderDistance,
      max_long: currLocation.long + markerRenderDistance,
    });
  if (error) {
    console.warn("Marker data fetched failed");
  } else {
    return data;
  }
}

export type location = {
  lat: number;
  long: number;
};
