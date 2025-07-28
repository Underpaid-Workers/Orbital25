import signIn from "@/supabase/auth_hooks/signIn";
import supabase from "@/supabase/main";
import fetchAllUserBadges from "@/supabase/progression_hooks/fetchAllUserBadges";
import { ResponseState } from "@/supabase/schema";
import { beforeAll, describe, expect, test } from "vitest";

describe("Check user badges fetching", () => {
  let result: ResponseState = { success: false };
  beforeAll(
    async () =>
      (result = await signIn("underpaidworker@gmail.com", "orbital25")),
    5000
  );
  test("Pretest login success", () => {
    expect(result).toStrictEqual({ success: true });
  });

  test("Response with correct number of badges", async () => {
    const sessionData = await supabase.auth.getSession();
    result = await fetchAllUserBadges(
      sessionData.data.session?.user.id as string
    );
    expect(result).toBeTruthy();
    expect(result).toMatchObject({ success: true });
    console.log(result.data);
    expect(result.data.length).toBeGreaterThan(0);
  });
});
