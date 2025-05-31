import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

/**
 * @description Deletes an entry of entryId from the public.entries table
 * @param session as Session
 * @param entryId as number
 * @param entryImageURL as string
 * @returns void
 */
export default async function deleteEntry(
  session: Session,
  entryId: number,
  entryImageURL: string
) {
  async function deletePhoto(imageURL: string) {
    //removes the front web url from imageURL, returns just the name of the image
    const imageName = imageURL.slice(imageURL.lastIndexOf("/") + 1);
    const { error } = await supabase.storage
      .from("entry-images")
      .remove([imageName]);

    if (error) throw error;
  }

  try {
    if (!session?.user) throw new Error("No user on the session!");
    const { error } = await supabase
      .from("entries")
      .delete()
      .eq("entry_id", entryId)
      .select();
    if (error) throw error;
    deletePhoto(entryImageURL);
    console.log("Entry  deleted");
  } catch (error: any) {
    Alert.alert(error.message);
  }
}
