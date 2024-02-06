import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    console.log("Building library");
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
              cesium: "Cesium",
            },
          },
        },
      },
    };
  } else {
    console.log("Building preview app");
    const base =
      mode === "production" ? "https://usace.github.io/groundwork-geo/" : "";
    return {
      plugins: [react()],
      base: base,
      build: {
        outDir: "docs",
      },
    };
  }
});
