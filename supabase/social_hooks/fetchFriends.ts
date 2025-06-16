import supabase from "@/supabase/main";
import { useEffect, useState } from "react";

type Friend = {
  name: string;
  speciesNum: number;
  isSelf?: boolean;
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

      if (userError || !user) {
        console.error("User not logged in.");
        setLoading(false);
        return;
      }
      
      //add user's own data to friend list
      const userId = user.id;
      const userEmail = user.email ?? "unknown@example.com";
      const userName = userEmail.split("@")[0];

      const { count: mySpeciesCount, error: mySpeciesErr } = await supabase
        .from("entriestest")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

      if (mySpeciesErr) {
        console.error("Error fetching own species count:", mySpeciesErr);
        setLoading(false);
        return;
      }

      const results: Friend[] = [
        {
          name: userName,
          speciesNum: mySpeciesCount || 0,
          isSelf: true
        },
      ];

      // friend ids
      const { data: friendships, error: friendErr } = await supabase
        .from("friendships")
        .select("friend_id")
        .eq("user_id", user.id);

      if (friendErr || !friendships) {
        console.error("Failed to fetch friendships", friendErr);
        setLoading(false);
        return;
      }

      for (const f of friendships) {
        const friendId = f.friend_id;

        const { data: userData, error: userErr } = await supabase
          .from("users")
          .select("email")
          .eq("id", friendId)
          .single();

        if (userErr || !userData) continue;

        const name = userData.email.split("@")[0];

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