import supabase from "@/supabase/main";
import { AuthError } from "@supabase/supabase-js";
import { ResponseState } from "../schema";

/**
 * @description Uses supabase authentication to sign out
 * @params none
 * @returns void
 */
export default async function signOut(): Promise<ResponseState> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    } else {
      return { success: true };
    }
  } catch (error) {
    const errorMessage = error as AuthError;
    return { success: false, message: errorMessage.message };
  }
}
