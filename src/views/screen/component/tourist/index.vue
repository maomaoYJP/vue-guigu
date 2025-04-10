<template>
  <div class="tourist-container">
    <h3 class="title">实时游客统计</h3>
    <p class="desc">可预约总量114514人</p>
    <div class="number">
      <span v-for="(item, index) in 10" :key="index">{{ item }}</span>
    </div>
    <div class="chart">我是水球图</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.tourist-container {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/screen/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .title {
    margin-left: 10px;
    color: #fff;
    font-size: 20px;
  }
  .desc {
    float: right;
    margin-right: 10px;
    color: #fff;
    font-size: 16px;
  }
  .number {
    padding: 10px;
    margin-top: 60px;
    display: flex;

    span {
      flex: 1;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background: url("@/assets/images/screen/total.png") no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .chart {
    height: 220px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 220px;
  }
}
</style>
