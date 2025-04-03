import router from "./routers";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "@/store/modules/users";
import pinia from "@/store";
import { reqUserInfo, reqLogOut } from "@/api/user";

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
      const res = await reqUserInfo();
      if (res.code === 200) {
        userStore.user.username = res.data.name;
        userStore.user.avatar = res.data.avatar;
        next();
      } else {
        throw new Error("获取用户信息失败");
      }
    } catch (error) {
      await reqLogOut();
      userStore.resetUser();
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
