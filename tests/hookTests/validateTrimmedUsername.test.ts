import validateTrimmedUsername from "@/hooks/validateTrimmedUsername";
import { describe, expect, test } from "vitest";

describe("Check Username string validator", () => {
  test("Handle normal valid string", () => {
    const result = validateTrimmedUsername("john");
    expect(result).toStrictEqual({ success: true });
  });
  test("Handle invalid string with space", () => {
    const result = validateTrimmedUsername("john doe");
    expect(result).toStrictEqual({
      success: false,
      error: "Username cannot contain spaces",
    });
  });
  test("Handle invalid string over character limit", () => {
    const result = validateTrimmedUsername("123456789012345678901");
    expect(result).toStrictEqual({
      success: false,
      error: "Username too long",
    });
  });
  test("Handle invalid empty string", () => {
    const result = validateTrimmedUsername("");
    expect(result).toStrictEqual({
      success: false,
      error: "Username cannot be empty",
    });
  });
  test("Handle invalid string with only empty spaces", () => {
    const result = validateTrimmedUsername("           ");
    expect(result).toStrictEqual({
      success: false,
      error: "Username cannot contain spaces",
    });
  });
});
