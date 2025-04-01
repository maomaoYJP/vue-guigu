<template>
  <div class="tabber-container">
    <Breadcrumb />
    <Setting />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>

<style scoped lang="scss">
.tabber-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
