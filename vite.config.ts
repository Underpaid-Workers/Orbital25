/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  define: {
    // __DEV__ will be true unless NODE_ENV=production
    __DEV__: process.env.NODE_ENV !== "production",
  },
  plugins: [tsconfigPaths()],
  resolve: {
    // 1) Redirect plain `react-native` → `react-native-web`
    // 2) Redirect deep imports (`react-native/Libraries/...`) to RNW’s exports
    alias: [
      { find: /^react-native$/, replacement: "react-native-web" },
      {
        find: /^react-native\/(.*)$/,
        replacement: "react-native-web/dist/exports/$1",
      },
    ],
    // 3) Tell Vite to prefer web-specific files
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    // 4) Prefer browser fields over module/main
    mainFields: ["browser", "module", "main"],
  },
  optimizeDeps: {
    // Pre-bundle RNW so Vite knows about it
    include: ["react-native-web"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["dotenv/config", "vitest.setup.ts"], //this line,
  },
});
