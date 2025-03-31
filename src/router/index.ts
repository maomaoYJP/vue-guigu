export const route = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      hidden: false,
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "layout",
    meta: {
      title: "layout",
      hidden: false,
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
          hidden: false,
        },
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/test",
        name: "test",
        meta: {
          title: "测试",
          hidden: true,
        },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "404",
      hidden: true,
    },
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    redirect: "/404",
    meta: {
      title: "错误路由",
      hidden: true,
    },
  },
];
