import formatDateTimeInsert from "@/hooks/formatDateTimeInsert";
import supabase from "@/supabase/main";
import EntryLocal, { EntryDatabase } from "@/supabase/schema";
import { Session } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

/**
 * @description Inserts an entry using format Entry into public.entries table
 * @param session as Session
 * @param entry as Entry
 * @returns void
 */
export default async function insertEntry(session: Session, entry: EntryLocal) {
  async function uploadPhoto(userId: string, entryId: number, image: string) {
    const imageEncoded = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const imageName = `${userId}-${entryId}-${uuid.v4()}`;
    const filePath = `${imageName}.jpg`;
    const { data, error } = await supabase.storage
      .from("entry-images")
      .update(filePath, decode(imageEncoded), {
        contentType: "image/jpg",
      });
    if (error) {
      Alert.alert(error.message);
    } else {
      console.log(data.path);
      return data.path;
    }
  }
  try {
    if (!session?.user) throw new Error("No user on the session!");
    const imageUrl = await uploadPhoto(session.user.id, entry.id, entry.image);
    const inserted = <EntryDatabase>{
      user_id: session.user.id,
      entry_id: entry.id,
      name: entry.name,
      datetime: formatDateTimeInsert(entry.datetime),
      image_url: imageUrl,
      species_type: entry.speciesType,
      env_type: entry.environmentType,
      rarity: entry.rarity,
      habitat: entry.habitat,
      location: `POINT(${entry.location.long} ${entry.location.lat})`, //long is inserted first, then lat!, eg. "POINT(103.73124634847045 1.3582308673358716)"
      description: entry.description,
      height: entry.height,
      weight: entry.weight,
      lifespan: entry.lifespan,
      observations: entry.observations,
    };
    const { error } = await supabase
      .from("entriestest")
      .insert(inserted)
      .select();
    if (error) {
      throw error;
    }
    console.log("Entry inserted");
  } catch (error: any) {
    Alert.alert("Error", error.message);
    console.error("Insert failed:", error);
  }
}
