import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function initialiseUserEventProgress(
  user_id: string
): Promise<ResponseState> {
  console.log("UserID : " + user_id);
  function formatCriteria<T extends Record<string, any>>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) =>
        typeof val === "number"
          ? [key, 0]
          : Array.isArray(val) && val.every((x) => typeof x === "number")
          ? [key, (val as number[]).map(() => 0)]
          : [key, val]
      )
    ) as T;
  }
  try {
    const { data: fetchData, error: fetchError } = await supabase
      .from("events")
      .select(`id, criteria`);
    if (fetchData) {
      let result = fetchData.map(({ criteria, id }) => {
        console.log(formatCriteria(criteria));
        return {
          event_id: id,
          user_id: user_id,
          progress: formatCriteria(criteria),
        };
      });
      const { error } = await supabase
        .from("user_event_progress")
        .insert(result);

      if (error) throw error;
    } else {
      throw new Error("Unable to fetch events");
    }

    if (fetchError) throw fetchError;

    return { success: true };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
