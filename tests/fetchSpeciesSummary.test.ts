import { beforeAll, describe, expect, test } from "vitest";
import fetchSpeciesSummary from "../hooks/fetchSpeciesSummary";
import { EntryMetadata } from "../supabase/entrySchema";

describe("Check AI Summary", () => {
  let data: Partial<EntryMetadata> | "NONE" | null;
  beforeAll(async () => {
    data = await fetchSpeciesSummary(
      "Turtle",
      "AIzaSyCvvv5D5gE2Ydh6V6wxyummkjsyI-PYeWY"
    );
  }, 10000);

  test("Should not be null", () => {
    expect(data).toBeTruthy();
  });

  test("Should have correct properties", () => {
    expect(data).toHaveProperty([
      "description",
      "weight",
      "height",
      "lifespan",
      "speciesType",
      "environmentType",
      "rarity",
    ]);
  });
});
