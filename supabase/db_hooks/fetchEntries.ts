import supabase from "@/supabase/main";
import EntryLocal, { ResponseState } from "@/supabase/schema";
import { PostgrestError, Session } from "@supabase/supabase-js";
/**
 * @description Fetches entries from the public.entries table.
 * @param session as Session
 * @returns Promise<EntryData> if successful
 */
export default async function fetchEntries(
  session: Session
): Promise<ResponseState> {
  const result: EntryLocal[] = [];

  type coordinate = {
    lat: number;
    long: number;
  };

  function fetchImage(image_url: string) {
    return supabase.storage.from("entry-images").getPublicUrl(image_url).data;
  }

  try {
    const { data, error } = await supabase
      .from("entries")
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
        `
      )
      .eq("user_id", session?.user.id)
      .order("entry_id", { ascending: true });
    if (error) throw error;

    if (data) {
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
            let temp = <EntryLocal>{
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

            result.push(temp);
          });
      }
    }
    return { success: true, data: result };
  } catch (error: any) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
