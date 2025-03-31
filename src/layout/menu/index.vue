<template>
  <div class="menu-container">
    <el-scrollbar>
      <el-menu>
        <template v-for="route in routes">
          <el-menu-item :index="route.path" v-if="!route.children">{{
            route.meta?.title
          }}</el-menu-item>
          <el-sub-menu :index="route.path" v-else>
            <template #title>{{ route.meta?.title }}</template>
            <el-menu-item v-for="child in route.children" :index="child.path">{{
              child.meta?.title
            }}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
defineProps(["routes"]);
</script>

<style scoped lang="scss">
.menu-container {
  height: calc(100vh - $admin-aside-title-container);
}
</style>
