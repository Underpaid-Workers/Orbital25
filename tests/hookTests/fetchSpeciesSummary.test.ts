import fetchSpeciesSummary from "@/hooks/fetchSpeciesSummary";
import { EntryMetadata } from "@/supabase/schema";
import { beforeAll, describe, expect, test } from "vitest";

describe("Check AI Summary", () => {
  let resultValid: Partial<EntryMetadata> | "NONE" | null;
  let resultInvalid: Partial<EntryMetadata> | "NONE" | null;

  beforeAll(async () => {
    resultValid = await fetchSpeciesSummary("Turtle");
    resultInvalid = await fetchSpeciesSummary("Can Opener");
  }, 10000);

  test("Valid and Invaliod should return a response", () => {
    expect(resultValid).toBeTruthy();
    expect(resultInvalid).toBeTruthy();
  });

  test("Valid species should have correct properties", () => {
    expect(resultValid).toHaveProperty("description");
    expect(resultValid).toHaveProperty("weight");
    expect(resultValid).toHaveProperty("height");
    expect(resultValid).toHaveProperty("lifespan");
    expect(resultValid).toHaveProperty("speciesType");
    expect(resultValid).toHaveProperty("environmentType");
    expect(resultValid).toHaveProperty("rarity");
  });

  test("Invalid species should return NONE", () => {
    expect(resultInvalid).toStrictEqual("NONE");
  });
});
