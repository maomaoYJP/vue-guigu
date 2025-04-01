<template>
  <div class="tabber-left">
    <SvgIcon
      :name="menuSettingStore.isCollapse ? 'expand' : 'fold'"
      height="24"
      width="24"
      @click="handleCollapse"
    />
    <el-breadcrumb separator="/" class="tabber-breadcrumb">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useMenuSettingStore from "@/store/modules/menuSetting";

const menuSettingStore = useMenuSettingStore();

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
