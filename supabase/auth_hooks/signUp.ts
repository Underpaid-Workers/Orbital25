import supabase from "@/supabase/main";
import { Response } from "@/supabase/schema";
import { AuthError } from "@supabase/supabase-js";
import { Alert } from "react-native";

/**
 * @description Use supabase authentication to sign up for an account. Creates an entry on auth.user
 * @param email as string
 * @param password as string
 * @returns void
 */
export default async function signUp(
  email: string,
  password: string
): Promise<Response> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    } else {
      if (!session) {
        Alert.alert("Success!");
      }
      return { success: true };
    }
  } catch (error) {
    const errorMessage = error as AuthError;
    Alert.alert("Error signing up!");
    return { success: false, error: errorMessage.message };
  }
}
