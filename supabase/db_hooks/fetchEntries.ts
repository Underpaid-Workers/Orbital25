import { EntryData } from "@/providers/EntryDataProvider";
import FetchEntry from "@/supabase/entrySchema";
import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

/**
 * @description Fetches entries from the public.entries table.
 * @param session as Session
 * @param onBegin as () => void
 * @param onComplete as () => void
 * @returns Promise<EntryData> if successful
 */
export default async function fetchEntries(
  session: Session,
  onBegin: () => void,
  onComplete: () => void
): Promise<EntryData> {
  const result = <EntryData>{
    data: <FetchEntry[]>[],
    count: 0,
  };

  function fetchImage(image_url: string) {
    return supabase.storage.from("entry-images").getPublicUrl(image_url).data;
  }

  try {
    onBegin();
    if (!session?.user) {
      throw new Error("No user on the session!");
    } else {
      const { data, count, error } = await supabase
        .from("entries")
        .select(
          `
          entry_id,
          name,
          datetime,
          image_url,
          species_type,
          env_type,
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
      }
      if (data && count) {
        data.forEach((entry) => {
          let image = fetchImage(entry.image_url).publicUrl;
          let temp = <FetchEntry>{
            id: entry.entry_id,
            name: entry.name,
            datetime: entry.datetime,
            image: image,
            speciesType: entry.species_type,
            environmentType: entry.env_type,
            description: entry.description,
            height: entry.height,
            weight: entry.weight,
            lifespan: entry.lifespan,
            observations: entry.observations,
          };

          result.data.push(temp);
        });

        result.count = count;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  } finally {
    onComplete();
    return result;
  }
}
