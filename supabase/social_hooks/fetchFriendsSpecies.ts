import supabase from "@/supabase/main";

type FriendSpecies = {
  name: string;
  speciesNum: number;
  isSelf?: boolean;
};

export async function fetchFriendsSpecies(): Promise<FriendSpecies[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not logged in.");
    return [];
  }

  const userId = user.id;

  const { data: currentUserData, error: currentUserErr } = await supabase
    .from("users")
    .select("displayname")
    .eq("id", userId)
    .single();

  const userName = currentUserData?.displayname?.trim() || "anonymous"; //return "anonymous" if no displayname

  const { count: mySpeciesCount, error: mySpeciesErr } = await supabase
    .from("entriestest")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (mySpeciesErr) {
    console.error("Error fetching own species count:", mySpeciesErr);
    return [];
  }

  const results: FriendSpecies[] = [
    {
      name: userName,
      speciesNum: mySpeciesCount || 0,
      isSelf: true,
    },
  ];

  const { data: friendships, error: friendErr } = await supabase
    .from("friendships")
    .select("friend_id")
    .eq("user_id", user.id);

  if (friendErr || !friendships) {
    console.error("Failed to fetch friendships", friendErr);
    return results;
  }

  for (const f of friendships) {
    const friendId = f.friend_id;

    const { data: userData, error: userErr } = await supabase
      .from("users")
      .select("displayname")
      .eq("id", friendId)
      .single();

    if (userErr || !userData) continue;

    const name = userData.displayname?.trim() || "anonymous";

    const { count, error: entryErr } = await supabase
      .from("entriestest")
      .select("*", { count: "exact", head: true })
      .eq("user_id", friendId);

    if (entryErr) continue;

    results.push({
      name,
      speciesNum: count || 0,
    });
  }

  return results;
}
