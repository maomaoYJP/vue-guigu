<template>
  <div>用户：{{ userStore.user.username }}</div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/users";

const userStore = useUserStore();
</script>

<style scoped></style>
