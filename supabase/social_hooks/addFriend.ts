import supabase from "@/supabase/main";

/**
 * @description Add a friend based on email to friends list
 * @param friendEmail as string
 * @returns Object of {sucess:string, message:string}
 */
export default async function addFriend(displayName: string) {
  // Get cur user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching current user:", userError);
    return { success: false, message: "User not logged in" };
  }

  const userId = user.id;

  // Find friend ID
  const { data: friendUser, error: friendError } = await supabase
    .from("users")
    .select("id")
    .eq("displayname", displayName)
    .single();

  if (friendError || !friendUser) {
    console.error("Error finding friend:", friendError);
    return { success: false, message: "Friend not found" };
  }

  const friendId = friendUser.id;
  console.log(friendId);

  // Insert friendship row
  const { error: insertError } = await supabase.from("friendships").insert([
    {
      user_id: userId,
      friend_id: friendId,
    },
  ]);

  if (insertError) {
    console.error("Error adding friend:", insertError);
    return { success: false, message: "Failed to add friend" };
  }

  return { success: true, message: "Friend added!" };
}
