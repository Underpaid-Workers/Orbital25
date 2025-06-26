import supabase from "@/supabase/main";
import { PostgrestError } from "@supabase/supabase-js";

type SaveResult = {
  success: boolean;
  error?: string;
};

export default async function checkUsername(
  trimmed: string
): Promise<SaveResult> {
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
