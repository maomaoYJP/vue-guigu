import { defineStore } from "pinia";
import { ref } from "vue";
import { route } from "@/router";
import type { RouteRecordRaw } from "vue-router";

interface UserInfo {
  username: string;
  avatar: string;
  token: string;
  routes: RouteRecordRaw[];
}

// 使用组合式api风格
const useUserStore = defineStore("users", () => {
  const user = ref<UserInfo>({
    username: "",
    avatar: "",
    token: localStorage.getItem("token") || "",
    routes: route,
  });

  const resetUser = () => {
    user.value = {
      username: "",
      avatar: "",
      token: "",
      routes: route,
    };
    localStorage.removeItem("token");
  };

  return {
    user,
    resetUser,
  };
});

export default useUserStore;
