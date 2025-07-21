import formatDateTimeInsert from "@/hooks/formatDateTimeInsert";
import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { PostgrestError } from "@supabase/supabase-js";
import moment from "moment";

export default async function addBadgesToUser(
  user_id: string,
  badgeCodes: string[]
): Promise<ResponseState> {
  try {
    const { data: badges, error: badgeErr } = await supabase
      .from("badges")
      .select("id")
      .in("code", badgeCodes);

    if (badgeErr) throw badgeErr;

    const currentDatetime = formatDateTimeInsert(
      moment().format("D,M,YYYY,h:mm A")
    );
    const badgeInserts = badges.map((badge) => ({
      user_id,
      badge_id: badge.id,
      earned_at: currentDatetime,
    }));

    const { error: insertErr } = await supabase
      .from("user_badges")
      .insert(badgeInserts);

    if (insertErr) throw insertErr;

    return { success: true };
  } catch (error) {
    const errorMessage = error as PostgrestError;
    return { success: false, message: errorMessage.message };
  }
}
