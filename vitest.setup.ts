// vitest.setup.ts
import { vi } from "vitest";

// mock the entire 'expo-constants' module
vi.mock("expo-constants", () => {
  return {
    default: {
      expoConfig: {
        extra: {
          hfToken: process.env.HF_TOKEN,
          hfModelUrl: process.env.HF_MODEL_URL,
          geminiAPIKey: process.env.GEMINI_API_KEY,
        },
      },
    },
    Constants: {
      expoConfig: {
        extra: {
          hfToken: process.env.HF_TOKEN,
          hfModelUrl: process.env.HF_MODEL_URL,
          geminiAPIKey: process.env.GEMINI_API_KEY,
        },
      },
    },
  };
});
