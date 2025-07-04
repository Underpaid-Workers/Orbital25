import { EntryData } from "@/providers/EntryDataProvider";
import supabase from "@/supabase/main";
import { Entry } from "@/supabase/schema";
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

  const rarityScores: Record<string, number> = {
    Common: 10,
    Uncommon: 20,
    Rare: 50,
    "Very Rare": 100,
    Unique: 1000,
  };

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
          habitat,
          location,
          description,
          height,
          weight,
          lifespan,
          observations
          `,

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
                habitat: entry.habitat,
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
        result.speciesCount = new Set(
          result.data.map((entry) => entry.name)
        ).size;
        result.score = result.data.reduce(
          (sum, entry) => sum + (rarityScores[entry.rarity] || 0),
          0
        );
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
