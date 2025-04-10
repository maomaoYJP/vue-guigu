<template>
  <div class="screen-container">
    <div
      class="screen"
      :style="{ transform: `scale(${ratio}) translate(-50%, -50%)` }"
    >
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from "./component/top/index.vue";
import Tourist from "./component/tourist/index.vue";
import Sex from "./component/sex/index.vue";
import Age from "./component/age/index.vue";

const getRatio = () => {
  const width = window.innerWidth / 1920;
  const height = window.innerHeight / 1080;
  return width < height ? width : height;
};

const ratio = ref(getRatio());

onMounted(() => {
  window.onresize = () => {
    ratio.value = getRatio();
  };
});
</script>

<style scoped lang="scss">
.screen-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/images/screen/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  .screen {
    width: 1920px;
    height: 1080px;
    position: absolute;
    transform-origin: 0 0;
    top: 50%;
    left: 50%;
  }
  .top {
    width: 100%;
    height: 40px;
  }
  .bottom {
    display: flex;
    .left {
      flex: 1;
      height: 1040px;
      display: flex;
      flex-direction: column;
      .tourist {
        flex: 1.2;
      }
      .sex {
        flex: 1;
      }
      .age {
        flex: 1;
      }
    }
    .center {
      flex: 2;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
