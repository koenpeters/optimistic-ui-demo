import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export const hash = Math.floor(Math.random() * 90000) + 10000;

export default defineConfig(({ mode }) => {
  return {
    define: {
      "process.env": loadEnv(mode, process.cwd(), ""),
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith("v-ce-"),
          },
        },
      }),
    ],
    test: {
      environment: "happy-dom",
    },
    base: "/",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      dedupe: ["vue"],
    },
    rollupOptions: {
      external: ["vue"],
      resolve: {
        dedupe: ["vue"],
      },
      output: {
        globals: {
          vue: "Vue",
        },
        output: {
          entryFileNames: `[name]` + hash + `.js`,
          chunkFileNames: `[name]` + hash + `.js`,
          assetFileNames: `[name]` + hash + `.[ext]`,
        },
      },
    },
  };
});
