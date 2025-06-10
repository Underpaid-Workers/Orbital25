import supabase from "@/supabase/main";

export const addFriend = async (friendEmail: string) => {
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

  // Find friend ID by email
  const { data: friendUser, error: friendError } = await supabase
    .from("users")
    .select("id")
    .eq("email", `${friendEmail}@gmail.com`) // Only works for gmail.com as of now
    .single();

  if (friendError || !friendUser) {
    console.error("Error finding friend:", friendError);
    return { success: false, message: "Friend not found" };
  }

  const friendId = friendUser.id;
  console.log(friendId)

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
};