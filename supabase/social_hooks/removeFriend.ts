import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";

/**
 * @description Removes friend from friends list of user
 * @param friendName as string
 * @returns Promise<RemoveFriendResult>
 */
export default async function removeFriend(
  friendName: string
): Promise<ResponseState> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return { success: false, message: "Unable to get current session." };
  }
  const currentUserId = session.user.id;

  //friend
  const { data: friendUser, error: friendLookupError } = await supabase
    .from("users")
    .select("id, displayname")
    .eq("displayname", friendName)
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
}
