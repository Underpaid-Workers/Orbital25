import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";

export default async function addBadgeToUser(
  user_id: string,
  badgeCode: string
): Promise<ResponseState> {
  try {
    const { data: badges, error: badgeErr } = await supabase
      .from("badges")
      .select("id")
      .eq("code", badgeCode)
      .single();

    if (badgeErr) throw badgeErr;

    const { error: insertErr } = await supabase.from("user_badges").insert({
      user_id: user_id,
      badge_id: badges.id,
      earned_at: new Date().toISOString(),
    });

    if (insertErr) throw insertErr;

    return { success: true };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
