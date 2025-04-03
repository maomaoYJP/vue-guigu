import router from "./routers";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "@/store/modules/users";
import pinia from "@/store";
import { getUserInfo } from "@/api/user";

const userStore = useUserStore(pinia);

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { token, username } = userStore.user;
  if (token) {
    if (to.path === "/login") {
      next("/");
      return;
    }
    if (username) {
      next();
      return;
    }
    // 没有用户名，需要获取用户信息
    try {
      const res = await getUserInfo();
      if (res.code === 200) {
        userStore.user.username = res.data.username;
        userStore.user.avatar = res.data.avatar;
        next();
      } else {
        throw new Error("获取用户信息失败");
      }
    } catch (error) {
      userStore.user.avatar = "";
      localStorage.removeItem("token");
      userStore.user.token = "";
      userStore.user.username = "";
      next({ path: "/login", query: { redirect: to.path } });
    }
  } else {
    if (to.path === "/login") {
      next();
      return;
    }
    next({ path: "/login", query: { redirect: to.path } });
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});
