import { defineStore } from "pinia";
import { ref } from "vue";
import type { LoginFormData } from "../../api/user/types";
import { userLogin } from "@/api/user";
// 使用组合式api风格
const useUserStore = defineStore("users", () => {
  const token = ref(localStorage.getItem("token") || "");

  const login = async (data: LoginFormData) => {
    const result = await userLogin(data);
    if (result.code === 200) {
      token.value = result.data.token || "";
      localStorage.setItem("token", token.value);
      return "success";
    } else {
      localStorage.removeItem("token");
      token.value = "";
      return Promise.reject(new Error(result.message));
    }
  };

  return {
    login,
    token,
  };
});

export default useUserStore;
