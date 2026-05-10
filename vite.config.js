import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const isMfe = mode === "mfe";

  return {
    base: env.VITE_BASE_PATH || "/docs",
    build: {
      target: "esnext",
      ...(isMfe
        ? {
            outDir: "dist-mfe",
            lib: {
              entry: path.resolve(__dirname, "src/bootstrap.ts"),
              formats: ["es"],
              fileName: () => "index.js",
            },
          }
        : {
            outDir: "dist-spa",
            rollupOptions: {
              input: path.resolve(__dirname, "index.html"),
            },
          }),
    },

    server: {
      port: Number(env.VITE_PORT) || 3002,
      cors: true,
    },

    preview: {
      port: Number(env.VITE_PORT) || 3002,
      cors: true,
    },
  };
});
