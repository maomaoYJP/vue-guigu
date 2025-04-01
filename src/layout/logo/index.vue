<template>
  <div class="logo-container">
    <img :src="setting.logo" alt="logo" />
    <p v-if="!menuSettingStore.isCollapse">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { setting } from "@/setting";
import useMenuSettingStore from "@/store/modules/menuSetting";
const menuSettingStore = useMenuSettingStore();
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: $admin-aside-title-container;
  padding: 16px;
  img {
    height: $admin-aside-title-img;
    width: $admin-aside-title-img;
    border-radius: 50%;
    object-fit: cover;
  }
  p {
    font-size: $admin-aside-title-text;
    margin-left: 10px;
  }
}
</style>
