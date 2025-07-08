import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function checkEmailExists(
  email: string
): Promise<ResponseState> {
  try {
    const { data, error } = await supabase.rpc("email_exists", {
      email_address: email,
    });

    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    console.log(errorMessage);
    return { success: false, message: errorMessage.message };
  }
}
