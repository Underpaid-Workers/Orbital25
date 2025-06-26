import { User } from "@/supabase/entrySchema";
import supabase from "@/supabase/main";

export default async function fetchUserdata(user_id: string): Promise<User> {
  const result = <User>{
    email: "",
    username: "",
  };

  try {
    const { data, error } = await supabase
      .from("users")
      .select(`displayname, email`)
      .eq("id", user_id)
      .single();
    if (!error) {
      result.email = data.email;
      result.username = data.displayname;
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
}
