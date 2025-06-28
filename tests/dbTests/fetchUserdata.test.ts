import signIn from "@/supabase/auth_hooks/signIn";
import supabase from "@/supabase/main";
import fetchUserdata from "@/supabase/social_hooks/fetchUserdata";
import { beforeAll, describe, expect, test } from "vitest";

describe("Check user data fetching", async () => {
  let result: { success: boolean; error?: string } = { success: false };
  beforeAll(
    async () =>
      (result = await signIn("underpaidworker@gmail.com", "orbital25")),
    5000
  );

  test("Pretest login success", () => {
    expect(result).toStrictEqual({ success: true });
  });

  test("Response with correct userdata", async () => {
    const user_id = await supabase.auth.getUser();
    const data = await fetchUserdata(user_id.data.user?.id as string);
    expect(data).toBeTruthy();
    expect(data).toStrictEqual({
      email: "underpaidworker@gmail.com",
      username: "test_account",
    });
  });
});
