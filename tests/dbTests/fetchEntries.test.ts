import signIn from "@/supabase/auth_hooks/signIn";
import fetchEntries from "@/supabase/db_hooks/fetchEntries";
import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import { beforeAll, describe, expect, test } from "vitest";

describe("Check entries fetching", () => {
  let result: { success: boolean; error?: string } = { success: false };
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
    const data = await fetchEntries(sessionData.data.session as Session);
    expect(data).toBeTruthy();
    expect(data).toMatchObject({ entryCount: 2 });
  });
});
