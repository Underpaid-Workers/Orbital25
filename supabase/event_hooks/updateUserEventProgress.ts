import supabase from "@/supabase/main";
import { ResponseState, UserEventProgressUpdate } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function updateUserEventProgress(
  updated: UserEventProgressUpdate[]
): Promise<ResponseState> {
  try {
    const { data, error } = await supabase
      .from("user_event_progress")
      .upsert(updated, {
        onConflict: "user_id, event_id",
      });

    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
