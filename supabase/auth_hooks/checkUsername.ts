import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function checkUsername(
  username: string
): Promise<ResponseState> {
  try {
    console.log("SDGDSGDGDSG");
    const { data, error } = await supabase
      .from("users")
      .select("id, displayname")
      .eq("displayname", username);

    if (error) throw error;
    console.log(username);
    console.log(data);
    if (data && data.length > 0) {
      return { success: false, message: "Username already taken" }; //check if username is already in use
    } else {
      return { success: true };
    }
  } catch (error) {
    const errorMessage = error as PostgrestError;
    console.log(errorMessage);
    return { success: false, message: errorMessage.message };
  }
}
