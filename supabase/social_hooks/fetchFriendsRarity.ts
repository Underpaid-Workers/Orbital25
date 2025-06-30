import supabase from "@/supabase/main";

type FriendRarity = {
  name: string;
  rarityScore: number;
  isSelf?: boolean;
};

export async function fetchFriendsRarity(): Promise<FriendRarity[]> {
  const rarityPoints = {
    Common: 10,
    Uncommon: 20,
    Rare: 50,
    "Very Rare": 100,
    Unique: 1000,
  };

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not logged in.");
    return [];
  }

  const userId = user.id;
  const results: FriendRarity[] = [];

  const { data: currentUserData, error: currentUserErr } = await supabase
    .from("users")
    .select("displayname")
    .eq("id", userId)
    .single();

  const userName = currentUserData?.displayname?.trim() || "anonymous";

  const { data: userEntries, error: userEntriesErr } = await supabase
    .from("entriestest")
    .select("rarity")
    .eq("user_id", userId);

  if (!userEntriesErr && userEntries) {
    let rarityScore = 0;
    for (const entry of userEntries) {
      const score =
        rarityPoints[entry.rarity as keyof typeof rarityPoints] || 0;
      rarityScore += score;
    }

    results.push({
      name: userName,
      rarityScore,
      isSelf: true,
    });
  }

  const { data: friendships, error: friendErr } = await supabase
    .from("friendships")
    .select("friend_id")
    .eq("user_id", userId);

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

    const { data: entries, error: entriesErr } = await supabase
      .from("entriestest")
      .select("rarity")
      .eq("user_id", friendId);

    if (entriesErr || !entries) continue;

    let rarityScore = 0;
    for (const entry of entries) {
      const score =
        rarityPoints[entry.rarity as keyof typeof rarityPoints] || 0;
      rarityScore += score;
    }

    results.push({
      name,
      rarityScore,
    });
  }

  return results;
}
