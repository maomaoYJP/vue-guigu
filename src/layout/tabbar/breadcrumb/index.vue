<template>
  <div class="tabber-left">
    <SvgIcon name="expand" height="24" width="24" />
    <el-breadcrumb separator="/" class="tabber-breadcrumb">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.tabber-left {
  display: flex;
  align-items: center;
  .tabber-breadcrumb {
    margin-left: 10px;
  }
}
</style>
