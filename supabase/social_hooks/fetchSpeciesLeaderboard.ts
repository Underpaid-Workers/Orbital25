import supabase from "@/supabase/main";

export async function fetchSpeciesLeaderboard() {
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, displayname");

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
        return null;
      }

      const name = user.displayname?.trim() || "anonymous";

      return {
        name,
        speciesNum: count ?? 0,
      };
    })
  );

  return userData.filter(
    (item): item is { name: string; speciesNum: number } => item !== null
  );
}
