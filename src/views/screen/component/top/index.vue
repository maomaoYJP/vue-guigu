<template>
  <div class="top">
    <div class="left">
      <div class="left-btn">首页</div>
    </div>
    <div class="center">
      <div class="title">数据大屏</div>
    </div>
    <div class="right">
      <div class="right-btn">退出</div>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const time = ref("");

onMounted(() => {
  setInterval(() => {
    time.value = new Date().toLocaleString();
  }, 1000);
});
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    flex: 1.5;
    background: url("@/assets/images/screen/dataScreen-header-left-bg.png")
      no-repeat;
    background-size: cover;
    .left-btn {
      width: 150px;
      height: 40px;
      float: right;
      background: url("@/assets/images/screen/dataScreen-header-btn-bg-l.png")
        no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url("@/assets/images/screen/dataScreen-header-center-bg.png")
        no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1.5;
    background: url("@/assets/images/screen/dataScreen-header-right-bg.png")
      no-repeat;
    background-size: 100% 100%;
    .right-btn {
      width: 150px;
      height: 40px;
      background: url("@/assets/images/screen/dataScreen-header-btn-bg-r.png")
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }

    .time {
      color: #29fcff;
      font-size: 20px;
    }
  }
}
</style>
