import supabase from "@/supabase/main";
import { Response } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function checkUsername(
  trimmed: string
): Promise<Response> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("displayname", trimmed);

    if (error) throw error;

    if (data && data.length > 0) {
      return { success: false, error: "Username already taken" }; //check if username is already in use
    } else {
      return { success: true };
    }
  } catch (error) {
    const fetchError = error as PostgrestError;
    return { success: false, error: fetchError.message };
  }
}
