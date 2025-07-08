import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function deleteAccount(): Promise<ResponseState> {
  try {
    const { error } = await supabase.rpc("delete_user");
    if (error) throw error;
    return { success: true };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
