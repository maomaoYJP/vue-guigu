import SvgIcon from "@/components/SvgIcon/index.vue";
import type { App, Component } from "vue";

// 声明全局组件类型
interface GlobalComponents {
  [key: string]: Component;
}

// 所有需要全局注册的组件
const components: GlobalComponents = {
  SvgIcon,
};

export default {
  install(app: App) {
    // 注册所有全局组件
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
