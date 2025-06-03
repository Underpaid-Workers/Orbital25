import supabase from "@/supabase/main";
import { Alert } from "react-native";

/**
 * @description Uses supabase authentication to attempt log in. Requires account that exists on auth.user
 * @param email as string
 * @param password as string
 * @returns void if successful, Alert if user credential invalid or user not exist
 */
export default async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    Alert.alert(error.message);
  }
}
