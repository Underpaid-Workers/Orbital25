import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

/**
 * @description Delete entry from supabase entriestest table
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
    const imageName = imageURL.slice(imageURL.lastIndexOf("/") + 1);
    const { error } = await supabase.storage
      .from("entry-images")
      .remove([imageName]);
    if (error) throw error;
  }

  try {
    if (!session?.user) throw new Error("No user on the session!");
    const userId = session.user.id;

    console.log(
      "Starting deletion process for user:",
      userId,
      "entry:",
      entryId
    );

    //delete row
    const { error: deleteError, data: deleteData } = await supabase
      .from("entriestest")
      .delete()
      .eq("user_id", userId)
      .eq("entry_id", entryId)
      .select();

    if (deleteError) {
      console.error("Delete error:", deleteError);
      throw deleteError;
    }
    console.log("Deleted entry row:", deleteData);

    //delete image frm storage
    await deletePhoto(entryImageURL);
    console.log("Deleted image from storage");

    //call sql function to change idx
    const { data, error } = await supabase.rpc(
      "decrement_entry_ids_after_delete",
      {
        deleted_entry_id: entryId,
        current_user_id: userId,
      }
    );
    if (error) {
      throw error;
    }
    console.log("Called decrement_entry_ids_after_delete function");

    Alert.alert("Success", "Entry deleted and entry IDs updated.");
  } catch (error: any) {
    Alert.alert("Error", error.message);
    console.error("Delete failed:", error);
  }
}
