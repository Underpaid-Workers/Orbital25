import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function checkUsername(
  trimmed: string
): Promise<ResponseState> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("displayname", trimmed);

    if (error) throw error;

    if (data && data.length > 0) {
      return { success: false, message: "Username already taken" }; //check if username is already in use
    } else {
      return { success: true };
    }
  } catch (error) {
    const fetchError = error as PostgrestError;
    return { success: false, message: fetchError.message };
  }
}
