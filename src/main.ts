import { createApp } from "vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "virtual:svg-icons-register";
import "@/styles/index.scss";

const app = createApp(App);

app.mount("#app");
