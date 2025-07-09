import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function deleteEntryImages(
  images: string[]
): Promise<ResponseState> {
  try {
    const { data, error } = await supabase.storage
      .from("entry_images")
      .remove(images);

    if (error) throw error;
    console.log(data);
    return { success: true };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
