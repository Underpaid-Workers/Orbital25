import signIn from "@/supabase/auth_hooks/signIn";
import { ResponseState } from "@/supabase/schema";
import { fetchUserIdByDisplayName } from "@/supabase/social_hooks/fetchUserIdByDisplayName";
import { beforeAll, describe, expect, test } from "vitest";

describe("Check other user profile fetching", async () => {
  let result: ResponseState = { success: false };
  beforeAll(
    async () =>
      (result = await signIn("underpaidworker@gmail.com", "orbital25")),
    5000
  );

  test("Pretest login success", () => {
    expect(result).toStrictEqual({ success: true });
  });

  test("Response with correct other's userdata", async () => {
    result = await fetchUserIdByDisplayName("test_account");
    expect(result).toBeTruthy();
    expect(result).toMatchObject({ success: true });
    expect(result.data).toStrictEqual("73390e96-2b84-44da-9c04-331d5adbf66d");
  });
});
