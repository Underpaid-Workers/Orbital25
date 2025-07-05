import { EntryMetadata } from "@/supabase/schema";
import { GoogleGenAI } from "@google/genai";
import Constants from "expo-constants";

/**
 * @description Fetch all species information from species name through Gemini API
 * @param speciesName as string
 * @returns Promise<Partial<EntryMetadata> | "NONE" | null>
 */
export default async function fetchSpeciesSummary(
  speciesName: string
): Promise<Partial<EntryMetadata> | "NONE" | null> {
  let geminiAPIKey: any = null;
  let ai: any = null;

  if (Constants.expoConfig && Constants.expoConfig.extra) {
    geminiAPIKey = Constants.expoConfig.extra.geminiAPIKey as string;
    ai = new GoogleGenAI({
      apiKey: geminiAPIKey,
    });
  } else {
    console.error(
      "Expo config (Constants.expoConfig.extra) is missing. Cannot load API keys."
    );
  }
  // console.log(process.env.GEMINI_API_KEY);
  // ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  if (ai) {
    try {
      const prompt = `Firstly, check if "${speciesName}" sounds like a valid animal or plant. If it is NOT, immediately return the word "NONE"
      and do not comply with the following instructions. If it is a valid animal or plant species, carry on with the following instructions.
      Return only a raw JSON object with the following data about the species "${speciesName}":
  {
    "description": "Brief description of the species with 2 fun facts integrated into the description, under 100 words. Make sure the sentences flow smoothly, and make it engaging for a reader",
    "weight": "xx - xx unit of measurement (kg or g)",
    "height": "xx - xx unit of measurement (m or cm)",
    "lifespan": "xx - xx unit of measurement (days, months, or years)",
    "speciesType": "Plant" or "Animal",
    "environmentType": "Terrestrial", "Aquatic", or "Flying",
    "rarity": "Common", "Uncommon", "Rare", "Very Rare", or "Unique",
    "habitat": "Forest", "Grassland", "Wetland", "Desert", "Mountains", "Coastal", "Oceanic", "Freshwater", "Urban", "Caves", "Tundra"
  }
  
  Determine rarity based on the global population size. If its less than 10000, return "Unique". If its between 10000 and 500000, return "Very Rare".
  If its between 500000 and 1000000, return "Uncommon". Lastly, for greater than 1000000, return "Common".
  Be completely certain that the data is returned in the exact format as described. 
  "habitat" must have at most 2 of the listed habitats in alphabetical order.
  Respond ONLY with this JSON and nothing else. Do not wrap it in code blocks or add any commentary.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const raw = response.text?.trim();
      if (!raw) throw new Error("No response from Gemini");

      if (raw.toUpperCase() === "NONE") return "NONE";

      const match = raw.match(/{[\s\S]*}/);
      if (!match) throw new Error("No valid JSON block found in response");

      const parsed = JSON.parse(match[0]);
      // console.log(parsed);

      if (!parsed || typeof parsed !== "object") return null;

      return {
        description: parsed.description || "",
        weight: parsed.weight || "",
        height: parsed.height || "",
        lifespan: parsed.lifespan || "",
        speciesType: parsed.speciesType || "",
        environmentType: parsed.environmentType || "",
        rarity: parsed.rarity || "",
        habitat: parsed.habitat || "",
      };
    } catch (error) {
      console.error("AI summary fetch error:", error);
      return null;
    }
  } else {
    return null;
  }
}
