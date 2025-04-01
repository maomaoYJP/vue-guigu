<template>
  <el-container class="layout-container">
    <el-aside class="aside">
      <Logo />
      <Menu :routes="routesRef" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Tabbar />
      </el-header>
      <el-main class="main">
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import Main from "@/layout/main/index.vue";
import Tabbar from "@/layout/tabbar/index.vue";
import useUserStore from "@/store/modules/users";
import type { RouteRecordRaw } from "vue-router";
const userStore = useUserStore();

const handleRoutes = (routes: RouteRecordRaw[]) => {
  return routes.filter((route) => {
    if (route.children) {
      route.children = handleRoutes(route.children);
    }
    return !route.meta?.hidden;
  });
};

const routesRef = ref<RouteRecordRaw[]>(handleRoutes(userStore.routes));
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  width: 100%;
}
.aside {
  width: 200px;
  height: 100vh;
  background-color: #d9ecff;
}
.header {
  background-color: #f0f2f5;
}
.main {
  background-color: #fff;
}
</style>
