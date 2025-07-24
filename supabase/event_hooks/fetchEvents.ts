import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function fetchEvents(
  user_id: string,
  currentTime: string
): Promise<ResponseState> {
  try {
    const { data, error } = await supabase.rpc("fetch_user_events", {
      p_current_time: currentTime,
      p_user_id: user_id,
    });
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
