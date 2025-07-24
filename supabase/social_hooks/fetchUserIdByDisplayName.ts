import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";

export async function fetchUserIdByDisplayName(
  displayname: string
): Promise<ResponseState> {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("displayname", displayname)
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching user ID:", error.message);
    return { success: false, message: error.message };
  }

  if (!data) {
    return { success: false, message: "User not found" };
  }

  return { success: true, data: data.id };
}

