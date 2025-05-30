import useFormatDateTimeInsert from "@/hooks/useFormatDateTimeInsert";
import { FullInsertEntry } from "@/supabase/entrySchema";
import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

/**
 * @description Insert entry using format FullInsertEntry into public.entries table
 * @param session as Session
 * @param entry as FullInsertEntry
 * @param onBegin as () => void
 * @param onComplete as () => void
 * @returns void
 */
export default async function insertEntry(
  session: Session,
  entry: FullInsertEntry,
  onBegin: () => void,
  onComplete: () => void
) {
  type EntryFormat = {
    user_id: string;
    entry_id: number;
    name: string;
    datetime: string;
    image_url: string;
    species_type: string;
    env_type: string;
    description: string;
    height: string;
    weight: string;
    lifespan: string;
    observations: string;
  };

  async function uploadPhoto(userId: string, entryId: number, image: string) {
    const imageName = `${userId}-${entryId}`;
    const filePath = `${imageName}.jpg`;
    const imageBase64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const { data, error } = await supabase.storage
      .from("entry-images")
      .update(filePath, decode(imageBase64), {
        contentType: "image/jpg",
      });

    if (error) {
      Alert.alert(error.message);
    } else {
      return data.path;
    }
  }

  try {
    onBegin();
    if (!session?.user) throw new Error("No user on the session!");

    const imageUrl = await uploadPhoto(session.user.id, entry.id, entry.image);
    // const inserted = <EntryFormat>{
    //   user_id: session.user.id,
    //   entry_id: entry.id,
    //   name: entry.name,
    //   datetime: useFormatDateTimeInsert(entry.dateTime),
    //   image_url: imageUrl,
    //   species_type: entry.speciesType,
    //   env_type: entry.environmentType,
    //   description: entry.description,
    //   height: entry.height,
    //   weight: entry.weight,
    //   lifespan: entry.lifespan,
    //   observations: entry.observations,
    // };

    //temp entry, actual entry formatting above when AI API comes through
    const inserted = <EntryFormat>{
      user_id: session.user.id,
      entry_id: entry.id,
      name: "rawr",
      datetime: useFormatDateTimeInsert(entry.dateTime),
      image_url: imageUrl,
      species_type: "mad",
      env_type: "sad",
      description: "lad",
      height: "lad",
      weight: "fat",
      lifespan: "long",
      observations: entry.observations,
    };

    const { data, error } = await supabase
      .from("entries")
      .insert(inserted)
      .select();

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.warn(error);
    Alert.alert(error);
  } finally {
    onComplete();
  }
}
