import supabase from "@/supabase/main";
import { Badge, ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function fetchUserBadges(
  user_id: string
): Promise<ResponseState> {
  try {
    let result: Badge[] = [];
    const { data, error } = await supabase
      .from("user_badges")
      .select(
        `
        earned_at,
        badges (
        id,
        code,
        name,
        description,
        image_url,
        badge_type,
        criteria
        )
        `
      )
      .eq("user_id", user_id)
      .order("earned_at", { ascending: false });

    if (error) throw error;

    if (data) {
      console.log("raw badge data : " + data);
      result = data.map((row) => {
        const badge = row.badges[0];
        return {
          id: badge.id,
          code: badge.code,
          name: badge.name,
          description: badge.description,
          image_url: badge.image_url,
          badge_type: badge.badge_type,
          earned_at: row.earned_at,
          criteria: badge.criteria,
        };
      });
    }

    console.log("fixed badge data: " + result);
    return { success: true, data: result };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
