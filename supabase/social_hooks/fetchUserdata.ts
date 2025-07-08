import supabase from "@/supabase/main";
import { User } from "@/supabase/schema";

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

    if (error) throw error;
    result.email = data.email;
    result.username = data.displayname;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
}
