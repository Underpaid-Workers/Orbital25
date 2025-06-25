import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";

/**
 * @description Fetch all entries that are within a set bounding box based on a location, and optionally user
 * @param currLocation as location object
 * @param user_id as string
 * @returns Array of Entries
 */
export default async function fetchGlobalEntriesByLocation(
  currLocation: location,
  filterUser: boolean,
  session: Session | null
) {
  if (filterUser) {
    console.log(session?.user.id);
    if (session) {
      const { data, error } = await supabase
        .schema("public")
        .rpc("entries_in_view", {
          min_lat: currLocation.lat - markerRenderDistance,
          min_long: currLocation.long - markerRenderDistance,
          max_lat: currLocation.lat + markerRenderDistance,
          max_long: currLocation.long + markerRenderDistance,
          p_user_id: session.user.id,
        });

      if (error) {
        console.warn("Marker data (User) fetched failed");
      } else {
        return data;
      }
    }
  } else {
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
}

export type location = {
  lat: number;
  long: number;
};

export const markerRenderDistance = 10;
