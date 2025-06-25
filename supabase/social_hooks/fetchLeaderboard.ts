import supabase from "@/supabase/main";

const rarityPoints = {
  Common: 10,
  Uncommon: 20,
  Rare: 50,
  "Very Rare": 100,
  Unique: 1000,
};

// species leaderboard
export async function getSpeciesData() {
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

// rarity score leaderboard
export async function getRarityData() {
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, displayname");

  if (userError) {
    console.error("Error fetching users:", userError);
    return [];
  }

  const userData = await Promise.all(
    users.map(async (user) => {
      const { data: entries, error: entryError } = await supabase
        .from("entriestest")
        .select("rarity")
        .eq("user_id", user.id);
      
      const name = user.displayname?.trim() || "anonymous";

      if (entryError || !entries) {
        console.error(`Error fetching entries for ${user.id}:`, entryError);
        return null;
      }

      const rarityScore = entries.reduce((total, entry) => {
        const rarity = entry.rarity as keyof typeof rarityPoints;
        return total + (rarityPoints[rarity] || 0);
      }, 0);

      return {
        name,
        rarityScore,
      };
    })
  );

  return userData.filter(
    (item): item is { name: string; rarityScore: number } => item !== null
  );
}

