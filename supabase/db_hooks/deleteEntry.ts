import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError, Session } from "@supabase/supabase-js";

/**
 * @description Delete entry from supabase entries table
 * @param session as Session
 * @param entryId as number
 * @param entryImageURL as string
 * @returns void
 */
export default async function deleteEntry(
  session: Session,
  entryId: number,
  entryImageURL: string
): Promise<ResponseState> {
  //TODO: Handle delete photo error throwing
  async function deletePhoto(imageURL: string) {
    const imageName = imageURL.slice(imageURL.lastIndexOf("/") + 1);
    const { error } = await supabase.storage
      .from("entry-images")
      .remove([imageName]);
    if (error) throw error;
  }

  try {
    const userId = session.user.id;

    console.log(
      "Starting deletion process for user:",
      userId,
      "entry:",
      entryId
    );

    //delete row
    const { error: deleteError, data: deleteData } = await supabase
      .from("entries")
      .delete()
      .eq("user_id", userId)
      .eq("entry_id", entryId)
      .select();

    if (deleteError) throw deleteError;
    console.log("Deleted entry row:", deleteData);

    //delete image frm storage
    await deletePhoto(entryImageURL);
    console.log("Deleted image from storage");

    //call sql function to change idx
    const { error } = await supabase.rpc("decrement_entry_ids_after_delete", {
      deleted_entry_id: entryId,
      current_user_id: userId,
    });
    if (error) throw error;
    console.log("Called decrement_entry_ids_after_delete function");

    return { success: true };
  } catch (error: any) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
