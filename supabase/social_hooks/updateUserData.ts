import supabase from "@/supabase/main";

/**
 * @description
 * @param user_id
 * @param newName
 */
export default async function updateUserdata(user_id: string, newName: string) {
  try {
    const { error } = await supabase
      .from("users")
      .update({ displayname: newName })
      .eq("id", user_id);

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}
