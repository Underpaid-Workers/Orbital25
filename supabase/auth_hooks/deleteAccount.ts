import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function deleteAccount(
  user_id: string
): Promise<ResponseState> {
  try {
    const { data, error } = await supabase.rpc("delete_user", {
      user_id_input: user_id,
    });
    if (error) throw error;

    return { success: true };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
