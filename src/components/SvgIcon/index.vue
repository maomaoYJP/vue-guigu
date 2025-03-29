<template>
  <svg :style="{ height, width }">
    <use :xlink:href="`#icon-${name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    color?: string;
    height?: string;
    width?: string;
  }>(),
  {
    color: "#000",
    height: "48px",
    width: "48px",
  }
);
</script>

<style scoped></style>
