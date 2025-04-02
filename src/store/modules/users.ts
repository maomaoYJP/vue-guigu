import { defineStore } from "pinia";
import { ref } from "vue";
import type { LoginFormData } from "../../api/user/types";
import { userLogin, getUserInfo } from "@/api/user";
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

  const login = async (data: LoginFormData) => {
    const result = await userLogin(data);
    if (result.code === 200) {
      user.value.token = result.data.token || "";
      localStorage.setItem("token", user.value.token);
      const info = await getUserInfo();
      user.value.username = info.data.username;
      user.value.avatar = info.data.avatar;
      return "success";
    } else {
      localStorage.removeItem("token");
      user.value.token = "";
      return Promise.reject(new Error(result.message));
    }
  };

  return {
    user,
    login,
  };
});

export default useUserStore;
