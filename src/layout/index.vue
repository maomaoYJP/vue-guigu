<template>
  <el-container class="layout-container">
    <el-aside class="aside">
      <Logo />
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
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
