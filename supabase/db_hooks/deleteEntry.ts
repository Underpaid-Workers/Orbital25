import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

export default async function deleteEntry(
  session: Session,
  entryId: number,
  entryImageURL: string,
  onBegin: () => void,
  onComplete: () => void
) {
  async function deletePhoto(imageURL: string) {
    const imageName = imageURL.slice(imageURL.lastIndexOf("/") + 1);
    console.log(imageName);
    const { data, error } = await supabase.storage
      .from("entry-images")
      .remove([imageName]);

    if (data) return data;
  }

  try {
    onBegin();
    if (!session?.user) throw new Error("No user on the session!");
    const { data, error } = await supabase
      .from("entries")
      .delete()
      .eq("entry_id", entryId)
      .select();

    if (error) throw error;
    deletePhoto(entryImageURL);
  } catch (error: any) {
    console.log(error);
    Alert.alert(error);
  } finally {
    onComplete();
  }
}
