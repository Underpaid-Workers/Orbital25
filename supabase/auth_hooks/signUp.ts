import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { AuthError } from "@supabase/supabase-js";

/**
 * @description Use supabase authentication to sign up for an account. Creates an entry on auth.user
 * @param email as string
 * @param password as string
 * @returns void
 */
export default async function signUp(
  email: string,
  password: string
): Promise<ResponseState> {
  try {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    const errorMessage = error as AuthError;
    return { success: false, message: errorMessage.message };
  }
}
