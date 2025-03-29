import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const svgIconsPlugin = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
  symbolId: "icon-[dir]-[name]",
});

export default defineConfig({
  plugins: [vue(), svgIconsPlugin],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});
