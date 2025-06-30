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

vi.mock("@react-native-async-storage/async-storage", () => {
  return {
    default: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
  };
});

vi.mock("@react-native-async-storage/async-storage", () => {
  let store: Record<string, string> = {};

  return {
    default: {
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
        return Promise.resolve();
      }),
      getItem: vi.fn((key: string) => {
        return Promise.resolve(store[key] ?? null);
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
        return Promise.resolve();
      }),
      clear: vi.fn(() => {
        store = {};
        return Promise.resolve();
      }),
      getAllKeys: vi.fn(() => {
        return Promise.resolve(Object.keys(store));
      }),
    },
  };
});
