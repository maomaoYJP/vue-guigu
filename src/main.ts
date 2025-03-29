import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import "virtual:svg-icons-register";
// 全局组件
import globalComponent from "@/components/index";

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn });
app.use(globalComponent);

app.mount("#app");
