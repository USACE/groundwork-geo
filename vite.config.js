import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(({ mode }) => {
    if (mode === "lib") {
        console.log("Building library");
        return {
            plugins: [react()],
            publicDir: false,
            build: {
                lib: {
                    name: "Groundwork-Geo",
                    fileName: (format) => `groundwork-geo.${format}.js`,
                    entry: "lib/index.jsx",
                },
                rollupOptions: {
                    external: ["react", "react-dom"],
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
        console.log("Building preview app", mode);
        const base =
            mode === "production"
                ? "https://usace.github.io/groundwork-geo/"
                : "http://localhost:5173/";
        return {
            plugins: [react()],
            base: base,
            build: {
                outDir: "docs",
            },
            define: {
                "import.meta.env.PKG_VERSION": JSON.stringify(pkg.version),
            },
        };
    }
});
