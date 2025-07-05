import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

/**
 * @description Update observation column of an entry of a user
 * @param session as Session
 * @param entryId as number
 * @param observation as string
 */
export default async function updateEntryObservation(
  session: Session,
  entryId: number,
  observation: string
) {
  try {
    if (!session?.user) throw new Error("No user on the session!");
    const userId = session.user.id;
    const { error } = await supabase
      .from("entriestest")
      .update({ observation: observation })
      .eq("user_id", userId)
      .eq("entry_id", entryId);

    if (error) {
      throw error;
    }
    console.log("Entry observation updated");
  } catch (error: any) {
    Alert.alert("Error", error.message);
    console.error("Update failed:", error);
  }
}
