import supabase from "@/supabase/main";

export async function fetchUserIdByDisplayName(displayname: string): Promise<{ success: boolean; id?: string; message?: string }> {
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

  return { success: true, id: data.id };
}
