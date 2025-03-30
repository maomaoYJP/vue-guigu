<template>
  <div>
    <h1>图标</h1>
    <SvgIcon name="phone"></SvgIcon>
    <el-button type="primary" size="default" @click="">嘿嘿</el-button>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request";

request
  .post("/user/login", {
    username: "admin",
    password: "123456",
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<style scoped lang="scss">
div {
  h1 {
    color: $color;
  }
}
</style>
