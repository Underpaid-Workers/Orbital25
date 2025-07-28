import supabase from "@/supabase/main";
import { ResponseState, User } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function fetchUserdata(
  user_id: string
): Promise<ResponseState> {
  let result = <User>{
    email: "",
    username: "",
    entrycount: 0,
    speciescount: 0,
    score: 0,
    stats: {},
  };

  try {
    const { data, error } = await supabase
      .from("users")
      .select(`displayname, email, entrycount, speciescount, score, stats`)
      .eq("id", user_id)
      .single();

    if (error) throw error;
    result = {
      email: data.email,
      username: data.displayname,
      entrycount: data.entrycount,
      speciescount: data.speciescount,
      score: data.score,
      stats: data.stats,
    };

    return { success: true, data: result };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
