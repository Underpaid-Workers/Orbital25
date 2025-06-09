import supabase from "@/supabase/main";

export default async function fetchGlobalEntriesByLocation(
  currLocation: location
) {
  const { data, error } = await supabase
    .schema("public")
    .rpc("entries_in_view", {
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

export const markerRenderDistance = 10;
