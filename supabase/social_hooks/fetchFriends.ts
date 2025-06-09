import supabase from "@/supabase/main";
import { useEffect, useState } from "react";

type Friend = {
  name: string;
  speciesNum: number;
};

export const fetchFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("Logged-in user ID from auth:", user?.id);

      if (userError || !user) {
        console.error("User not logged in.");
        setLoading(false);
        return;
      }

      console.log("Logged-in user ID from auth:", user.id);

      // Step 1: Get all friend_ids where user_id = current user
      const { data: friendships, error: friendErr } = await supabase
        .from("friendships")
        .select("friend_id")
        .eq("user_id", user.id);
        console.log("Logged-in user ID:", user.id);

      if (friendErr || !friendships) {
        console.error("Failed to fetch friendships", friendErr);
        setLoading(false);
        return;
      }
      console.log("Friendship rows:", friendships)
      // Step 2: For each friend_id, get email and species count
      const results: Friend[] = [];

      for (const f of friendships) {
        const friendId = f.friend_id;

        // Fetch email
        const { data: userData, error: userErr } = await supabase
          .from("users")
          .select("email")
          .eq("id", friendId)
          .single();

        if (userErr || !userData) continue;

        // Derive name from email
        const name = userData.email.split("@")[0];

        // Count species (entries)
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

      setFriends(results);
      setLoading(false);
    };

    fetchFriends();
  }, []);

  return { friends, loading };
};