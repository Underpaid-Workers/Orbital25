import supabase from "@/supabase/main";

type RemoveFriendResult = { success: true } | { success: false; message: string };

export const removeFriend = async (friendName: string): Promise<RemoveFriendResult> => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return { success: false, message: "Unable to get current session." };
  }
  const currentUserId = session.user.id;

//friend
  const friendEmail = `${friendName}@gmail.com`;
  const {
    data: friendUser,
    error: friendLookupError,
  } = await supabase
    .from("users")
    .select("id")
    .eq("email", friendEmail)
    .maybeSingle();

  if (friendLookupError) {
    return { success: false, message: friendLookupError.message };
  }
  if (!friendUser) {
    return { success: false, message: "Friend not found in user table." };
  }
  const friendId = friendUser.id;

  //delete row
  const { error: deleteError } = await supabase
    .from("friendships")
    .delete()
    .match({ user_id: currentUserId, friend_id: friendId });

  if (deleteError) {
    return { success: false, message: deleteError.message };
  }

//DELETE INVERSE DIRECTION LATER ON
  //await supabase
    //.from("friendships")
    //.delete()
    //.match({ user_id: friendId, friend_id: currentUserId });

  return { success: true };
};


