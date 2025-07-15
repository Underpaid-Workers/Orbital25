import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function fetchEvents(
  currentTime: string
): Promise<ResponseState> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select(`id, title, description, end_time, frequency, image`)
      .gt("end_time", currentTime)
      .order("end_time", { ascending: true });
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
