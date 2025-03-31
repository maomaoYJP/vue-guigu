<template>
  <div class="menu-container">
    <el-scrollbar>
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.menu-container {
  height: calc(100vh - $admin-aside-title-container);
}
</style>
