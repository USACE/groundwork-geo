import { defineConfig, esmExternalRequirePlugin } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const isExternalPackage = (id) =>
  !id.endsWith(".css") &&
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`));
const libraryAssetFileNames = (assetInfo) => {
  const names = assetInfo.names ?? (assetInfo.name ? [assetInfo.name] : []);
  if (names.some((n) => n.endsWith(".css"))) {
    return "groundwork-geo.css";
  }
  return "assets/[name][extname]";
};
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    console.log("Building library");
    return {
      plugins: [
        react(),
        esmExternalRequirePlugin({
          external: ["react", "react-dom", "react/jsx-runtime"],
        }),
      ],
      publicDir: false,
      build: {
        lib: {
          name: "GroundworkGeo",
          fileName: (format) => `groundwork-geo.${format}.js`,
          entry: "lib/index.jsx",
          formats: ["es", "umd"],
        },
        rolldownOptions: {
          external: isExternalPackage,
          output: [
            {
              format: "es",
              dir: "dist",
              preserveModules: true,
              preserveModulesRoot: "lib",
              entryFileNames: "es/[name].js",
              chunkFileNames: "es/chunks/[name]-[hash].js",
              assetFileNames: libraryAssetFileNames,
            },
            {
              format: "umd",
              name: "GroundworkGeo",
              entryFileNames: "groundwork-geo.umd.cjs",
              assetFileNames: libraryAssetFileNames,
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "react/jsx-runtime": "ReactJsxRuntime",
              },
            },
          ],
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
