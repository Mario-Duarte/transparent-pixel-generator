import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["**/*.test.ts"],
    exclude: ["node_modules", "dist", "coverage", "**/*.d.ts"],
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
