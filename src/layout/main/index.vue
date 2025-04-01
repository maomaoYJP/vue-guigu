<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="!menuSetting.refreshing" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useMenuSettingStore from "@/store/modules/menuSetting";
const menuSetting = useMenuSettingStore();

const flag = ref(true);

watch(
  () => menuSetting.refreshing,
  () => {
    if (menuSetting.refreshing) {
      nextTick(() => {
        menuSetting.refreshing = false;
      });
    }
  }
);
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
