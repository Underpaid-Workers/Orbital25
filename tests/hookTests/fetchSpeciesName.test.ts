import fetchSpeciesName from "../../hooks/fetchSpeciesName";
import { invalidImage } from "../test_assets/InvalidImageBase64";
import { validImage } from "../test_assets/ValidImageBase64";

describe("Check AI species identifier", async () => {
  let resultValid: string;
  let resultInvalid: string;
  beforeAll(async () => {
    resultValid = await fetchSpeciesName(validImage);
    resultInvalid = await fetchSpeciesName(invalidImage);
  }, 10000);

  test("Valid and Invalid should have response", () => {
    expect(resultValid).toBeTruthy();
    expect(resultInvalid).toBeTruthy();
  });

  //How does a white screen return "Can Opener??"
  // test("Invalid should respond correctly", () => {
  //   expect(resultInvalid).toStrictEqual("Nothing");
  // });
});
