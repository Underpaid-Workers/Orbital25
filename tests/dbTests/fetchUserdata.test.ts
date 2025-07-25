import signIn from "@/supabase/auth_hooks/signIn";
import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import fetchUserdata from "@/supabase/social_hooks/fetchUserdata";
import { beforeAll, describe, expect, test } from "vitest";

describe("Check user data fetching", async () => {
  let result: ResponseState = { success: false };
  beforeAll(
    async () =>
      (result = await signIn("underpaidworker@gmail.com", "orbital25")),
    5000
  );

  test("Pretest login success", () => {
    expect(result).toStrictEqual({ success: true });
  });

  test("Response with correct username and email", async () => {
    const user_id = await supabase.auth.getUser();
    result = await fetchUserdata(user_id.data.user?.id as string);
    expect(result).toBeTruthy();
    expect(result).toMatchObject({ success: true });
    expect(result.data).toMatchObject({
      email: "underpaidworker@gmail.com",
      username: "test_account",
    });
  });

  test("Response with correct user stats", async () => {
    const user_id = await supabase.auth.getUser();
    result = await fetchUserdata(user_id.data.user?.id as string);
    expect(result).toBeTruthy();
    expect(result).toMatchObject({ success: true });
    expect(result.data).toMatchObject({
      entrycount: 2,
      speciescount: 2,
      score: 110,
    });
  });
});
