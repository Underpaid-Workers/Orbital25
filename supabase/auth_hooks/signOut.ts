import supabase from "@/supabase/main";

/**
 * @description Uses supabase authentication to sign out
 * @params none
 * @returns void
 */
export default async function signOut() {
  supabase.auth.signOut();
}
