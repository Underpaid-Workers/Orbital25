import supabase from "@/supabase/main";
import { Response } from "@/supabase/schema";
import { AuthError } from "@supabase/supabase-js";
import { Alert } from "react-native";

/**
 * @description Uses supabase authentication to attempt log in. Requires account that exists on auth.user
 * @param email as string
 * @param password as string
 * @returns void if successful, Alert if user credential invalid or user not exist
 */
export default async function signIn(
  email: string,
  password: string
): Promise<Response> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    } else {
      return { success: true };
    }
  } catch (error) {
    const errorMessage = error as AuthError;
    Alert.alert(errorMessage.message);
    return { success: false, error: errorMessage.message };
  }
}
