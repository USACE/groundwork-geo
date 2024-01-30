import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
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
});
