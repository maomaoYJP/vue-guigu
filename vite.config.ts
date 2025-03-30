import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

const svgIconsPlugin = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
  symbolId: "icon-[dir]-[name]",
});

const autoImportPlugin = AutoImport({
  resolvers: [ElementPlusResolver()],
});

const componentsPlugin = Components({
  dirs: ["src/components"],
  resolvers: [ElementPlusResolver()],
  dts: true,
});

export default defineConfig({
  plugins: [vue(), svgIconsPlugin, autoImportPlugin, componentsPlugin],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});
