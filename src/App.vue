<template>
  <div>
    <el-button :icon="Check">按钮</el-button>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
    <Test />
  </div>
</template>

<script setup lang="ts">
import { Check } from "@element-plus/icons-vue";
import Test from "@/components/Test.vue";
console.log(import.meta.env.VITE_APP_TITLE);
</script>

<style scoped></style>
