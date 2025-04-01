export const route = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      hidden: true,
      icon: "user",
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "layout",
    meta: {
      title: "",
      hidden: false,
      icon: "user",
    },
    redirect: "/home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
          hidden: false,
          icon: "user",
        },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "Screen",
      hidden: false,
      icon: "user",
    },
  },
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "user",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "user",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "user",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "user",
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "user",
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          icon: "user",
          hidden: false,
        },
      },
      {
        path: "/product/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          icon: "user",
          hidden: false,
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "Spu",
          icon: "user",
          hidden: false,
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "Sku",
          icon: "user",
          hidden: false,
        },
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
