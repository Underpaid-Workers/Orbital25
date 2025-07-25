import signIn from "@/supabase/auth_hooks/signIn";
import fetchEntries from "@/supabase/db_hooks/fetchEntries";
import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import { Session } from "@supabase/supabase-js";
import { beforeAll, describe, expect, test } from "vitest";

describe("Check entries fetching", () => {
  let result: ResponseState = { success: false };
  beforeAll(
    async () =>
      (result = await signIn("underpaidworker@gmail.com", "orbital25")),
    5000
  );
  test("Pretest login success", () => {
    expect(result).toStrictEqual({ success: true });
  });

  test("Response with correct number of entries", async () => {
    const sessionData = await supabase.auth.getSession();
    result = await fetchEntries(sessionData.data.session as Session);
    expect(result).toBeTruthy();
    expect(result).toMatchObject({ success: true });
    expect(result.data).toHaveLength(2);
  });
});
