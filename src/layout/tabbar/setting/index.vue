<template>
  <div class="tabber-right">
    <el-button size="small" circle>
      <SvgIcon name="refresh" height="16" width="16" @click="handleRefresh" />
    </el-button>
    <el-button size="small" circle>
      <SvgIcon
        name="fullscreen"
        height="16"
        width="16"
        @click="handleFullscreen"
      />
    </el-button>
    <el-button size="small" circle>
      <SvgIcon name="setting" height="16" width="16" />
    </el-button>
    <img :src="userStore.user.avatar" alt="" />
    <el-dropdown>
      <span style="font-size: 20px">
        {{ userStore.user.username }}
        <SvgIcon name="arrowdown" height="14" width="14"
      /></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useMenuSettingStore from "@/store/modules/menuSetting";
import useUserStore from "@/store/modules/users";
import { useRouter } from "vue-router";

const menuSetting = useMenuSettingStore();
const userStore = useUserStore();
const router = useRouter();

const handleRefresh = () => {
  menuSetting.refreshing = true;
};

const handleFullscreen = () => {
  const fullScreen = document.fullscreenElement;
  if (!fullScreen) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const handleLogout = () => {
  userStore.user.avatar = "";
  localStorage.removeItem("token");
  userStore.user.token = "";
  userStore.user.username = "";
  router.push("/login");
};
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
