<template>
  <div class="menu-container">
    <el-scrollbar>
      <el-menu
        :router="true"
        :default-active="$route.path"
        :collapse="menuSettingStore.isCollapse"
        :collapse-transition="false"
        background-color="#d9ecff"
      >
        <template v-for="route in routes">
          <el-menu-item :index="route.path" v-if="!route.children"
            ><el-icon>
              <SvgIcon :name="(route.meta?.icon as string)"></SvgIcon>
            </el-icon>
            <template #title>{{ route.meta?.title }}</template>
          </el-menu-item>
          <el-menu-item
            v-else-if="route.children.length === 1"
            :index="route.children[0].path"
          >
            <el-icon>
              <SvgIcon :name="(route.meta?.icon as string)"></SvgIcon>
            </el-icon>
            <template #title>{{ route.meta?.title }}</template>
          </el-menu-item>
          <el-sub-menu :index="route.path" v-else>
            <template #title>
              <el-icon>
                <SvgIcon :name="(route.meta?.icon as string)"></SvgIcon>
              </el-icon>
              <span> {{ route.meta?.title }}</span></template
            >
            <el-menu-item v-for="child in route.children" :index="child.path">
              <el-icon>
                <SvgIcon
                  :name="(route.meta?.icon as string)"
                ></SvgIcon> </el-icon
              >{{ child.meta?.title }}</el-menu-item
            >
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import useMenuSettingStore from "@/store/modules/menuSetting";

const menuSettingStore = useMenuSettingStore();

defineProps<{
  routes: RouteRecordRaw[];
}>();
</script>

<style scoped lang="scss">
.menu-container {
  height: calc(100vh - $admin-aside-title-container);
}
.el-menu {
  border-right: 0;
}
</style>
