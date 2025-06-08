import { EntryData } from "@/providers/EntryDataProvider";
import { Entry } from "@/supabase/entrySchema";
import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";
/**
 * @description Fetches entries from the public.entries table.
 * @param session as Session
 * @returns Promise<EntryData> if successful
 */
export default async function fetchEntries(
  session: Session
): Promise<EntryData> {
  const result = <EntryData>{
    data: <Entry[]>[],
    entryCount: 0,
    speciesCount: 0,
    score: 0,
  };

  function fetchImage(image_url: string) {
    return supabase.storage.from("entry-images").getPublicUrl(image_url).data;
  }

  type coordinate = {
    lat: number;
    long: number;
  };

  try {
    if (!session?.user) {
      throw new Error("No user on the session!");
    } else {
      const { data, count, error } = await supabase
        .from("entriestest")
        .select(
          `
          entry_id,
          name,
          datetime,
          image_url,
          species_type,
          env_type,
          rarity,
          location,
          description,
          height,
          weight,
          lifespan,
          observations`,

          { count: "exact" }
        )
        .eq("user_id", session?.user.id)
        .order("entry_id", { ascending: true });
      if (error) {
        throw error;
      } else if (data && count) {
        let coord: coordinate;
        for (const entry of data) {
          const convertToLatLong = async () => {
            const { data } = await supabase
              .rpc("geo_to_latlong", {
                g: entry.location,
              })
              .maybeSingle();
            return data as coordinate;
          };

          await convertToLatLong()
            .then((latlong) => (coord = latlong))
            .finally(() => {
              let image = fetchImage(entry.image_url).publicUrl;
              let temp = <Entry>{
                id: entry.entry_id,
                name: entry.name,
                datetime: entry.datetime,
                image: image,
                speciesType: entry.species_type,
                environmentType: entry.env_type,
                rarity: entry.rarity,
                location: { lat: coord.lat, long: coord.long },
                description: entry.description,
                height: entry.height,
                weight: entry.weight,
                lifespan: entry.lifespan,
                observations: entry.observations,
              };

              result.data.push(temp);
            });
        }

        result.entryCount = count;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  } finally {
    return result;
  }
}
