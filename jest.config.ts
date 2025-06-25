import type { Config } from "jest";

const config: Config = {
  testMatch: ["**/tests/*.test.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
