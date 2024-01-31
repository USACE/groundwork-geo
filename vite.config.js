import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "build-lib") {
    return {
      plugins: [react()],
      publicDir: false,
      build: {
        lib: {
          entry: "lib/index.js",
          name: "Groundwork-Geo",
          fileName: (format) => `groundwork-geo.${format}.js`,
        },
        rollupOptions: {
          external: ["react", "react-dom", "cesium"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
    };
  } else {
    const homepage = "https://usace.github.io/groundwork-geo";
    return {
      plugins: [react()],
      base: mode === "production" ? homepage : "/",
      build: {
        outDir: "docs",
      },
    };
  }
});
