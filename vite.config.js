import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "transparentPixelGenerator",
      fileName: "transparent-pixel-generator",
      formats: ["umd"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    }
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
