import supabase from "@/supabase/main";
import { Badge, ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function fetchAllUserBadges(
  user_id: string
): Promise<ResponseState> {
  try {
    const { data, error } = await supabase.rpc("get_user_badges", {
      user_id_input: user_id,
    });
    if (error) throw error;
    return { success: true, data: data as Badge[] };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
