import signIn from "@/supabase/auth_hooks/signIn";
import fetchEvents from "@/supabase/event_hooks/fetchEvents";
import supabase from "@/supabase/main";
import { ResponseState } from "@/supabase/schema";
import moment from "moment";
import { beforeAll, describe, expect, test } from "vitest";

describe("Check events fetching", () => {
  let result: ResponseState = { success: false };
  beforeAll(
    async () =>
      (result = await signIn("underpaidworker@gmail.com", "orbital25")),
    5000
  );
  test("Pretest login success", () => {
    expect(result).toStrictEqual({ success: true });
  });

  test("Response with events", async () => {
    const sessionData = await supabase.auth.getSession();
    result = await fetchEvents(
      sessionData.data.session?.user.id as string,
      moment().format()
    );
    expect(result).toBeTruthy();
    expect(result).toMatchObject({ success: true });
    expect(result.data.length).toBeGreaterThan(0);
  });
});
