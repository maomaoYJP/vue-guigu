<template>
  <div class="tabber-left">
    <SvgIcon
      :name="menuSettingStore.isCollapse ? 'expand' : 'fold'"
      height="24"
      width="24"
      @click="handleCollapse"
    />
    <el-breadcrumb separator="/" class="tabber-breadcrumb">
      <el-breadcrumb-item
        v-for="route in routers.matched"
        :key="route.path"
        :to="route.path"
        v-show="route.meta.title"
      >
        {{ route.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useMenuSettingStore from "@/store/modules/menuSetting";
import { useRoute } from "vue-router";

const menuSettingStore = useMenuSettingStore();
const routers = useRoute();

const handleCollapse = () => {
  menuSettingStore.isCollapse = !menuSettingStore.isCollapse;
};
</script>

<style scoped lang="scss">
.tabber-left {
  display: flex;
  align-items: center;
  .tabber-breadcrumb {
    margin-left: 10px;
  }
}
</style>
