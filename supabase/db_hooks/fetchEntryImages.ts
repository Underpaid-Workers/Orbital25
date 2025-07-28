import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function fetchEntryImages(
  user_id: string
): Promise<ResponseState> {
  let result: string[] = [];
  try {
    const { data, error } = await supabase
      .from("entries")
      .select(`image_url`)
      .eq("user_id", user_id);
    if (error) throw error;
    // const {error} = await supabase.storage.from("entry-images").remove(data)
    data.map((image) => result.push(image.image_url));
    return { success: true, data: result };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
