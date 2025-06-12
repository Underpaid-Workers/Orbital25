import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";


export default async function deleteEntry(
  session: Session,
  entryId: number,
  entryImageURL: string
) {
  async function deletePhoto(imageURL: string) {
    const imageName = imageURL.slice(imageURL.lastIndexOf("/") + 1);
    const { error } = await supabase.storage.from("entry-images").remove([imageName]);
    if (error) throw error;
  }

  try {
    if (!session?.user) throw new Error("No user on the session!");
    const userId = session.user.id;

    console.log("Starting deletion process for user:", userId, "entry:", entryId);

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
    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "decrement_entry_ids_after_delete",
      {
        deleted_entry_id: entryId,
        current_user_id: userId,
      }
    );

    if (rpcError) {
      console.error("RPC error:", rpcError);
      throw rpcError;
    }
    console.log("Called decrement_entry_ids_after_delete function, result:", rpcData);

    Alert.alert("Success", "Entry deleted and entry IDs updated.");
  } catch (error: any) {
    Alert.alert("Error", error.message);
    console.error("Delete failed:", error);
  }
}
