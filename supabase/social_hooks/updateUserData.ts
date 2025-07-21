import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * @description
 * @param user_id
 * @param newName
 */
export default async function updateUserdata(
  user_id: string,
  newName: string
): Promise<ResponseState> {
  try {
    const { error } = await supabase
      .from("users")
      .update({ displayname: newName })
      .eq("id", user_id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
