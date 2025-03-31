import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { viteMockServe } from "vite-plugin-mock";

const svgIconsPlugin = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
  symbolId: "icon-[dir]-[name]",
});

const autoImportPlugin = AutoImport({
  resolvers: [ElementPlusResolver()],
  imports: ["vue"],
  dts: "src/types/auto-import.d.ts",
});

const componentsPlugin = Components({
  dirs: ["src/components/SvgIcon"],
  resolvers: [ElementPlusResolver()],
  dts: "src/types/components.d.ts",
});

const mockPlugin = viteMockServe({
  mockPath: "mock",
  enable: true,
});

export default defineConfig({
  plugins: [
    vue(),
    svgIconsPlugin,
    autoImportPlugin,
    componentsPlugin,
    mockPlugin,
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variable.scss" as *;`,
      },
    },
  },
});
