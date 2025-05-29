import supabase from "@/supabase/main";
import { Alert } from "react-native";

/**
 * @description Use supabase authentication to sign up for an account. Creates an entry on auth.user
 * @param email
 * @param password
 * @param onBegin
 * @param onComplete
 * @returns void
 */
export default async function signUp(
  email: string,
  password: string,
  onBegin: () => void,
  onComplete: () => void
) {
  onBegin();
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    Alert.alert(error.message);
  } else {
    if (!session) {
      Alert.alert("Success!");
    }
  }
  onComplete();
}
