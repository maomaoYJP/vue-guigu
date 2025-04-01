<template>
  <div class="tabber-right">
    <el-button size="small" circle>
      <SvgIcon name="refresh" height="16" width="16" />
    </el-button>
    <el-button size="small" circle>
      <SvgIcon name="fullscreen" height="16" width="16" />
    </el-button>
    <el-button size="small" circle>
      <SvgIcon name="setting" height="16" width="16" />
    </el-button>
    <img :src="avatar" alt="" />
    <el-dropdown>
      <span style="font-size: 20px">
        admin <SvgIcon name="arrowdown" height="14" width="14"
      /></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import avatar from "@/assets/images/avatar.jpg";
</script>

<style scoped lang="scss">
.tabber-right {
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 10px;
  }
}
</style>
