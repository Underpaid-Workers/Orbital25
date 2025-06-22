import supabase from "@/supabase/main";

export const getSpeciesLeaderboardData = async () => {
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, email");

  if (userError) {
    console.error("Error fetching users:", userError);
    return [];
  }

  const userData = await Promise.all(
    users.map(async (user) => {
      const { count, error: entryError } = await supabase
        .from("entriestest")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (entryError) {
        console.error(`Error counting entries for ${user.id}:`, entryError);
        return;
      }

      return {
        name: user.email?.split("@")[0] ?? "unknown",
        speciesNum: count ?? 0,
      };
    })
  );

  const filteredData = userData.filter(
    (item): item is { name: string; speciesNum: number } => item !== null
  );

  //const top20 = filteredData.sort((a,b) => b.speciesNum - a.speciesNum).slice(0,20);

  return filteredData
};
