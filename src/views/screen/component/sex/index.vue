<template>
  <div class="sex-container">
    <div class="title">性别比例</div>
    <div class="sex">
      <div class="man">
        <img :src="man" alt="" />
      </div>
      <div class="women">
        <img :src="woman" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import man from "@/assets/images/screen/man.png";
import woman from "@/assets/images/screen/woman.png";

import * as echarts from "echarts";
const charts = ref();
onMounted(() => {
  const myCharts = echarts.init(charts.value);
  myCharts.setOption({
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: "skyblue",
          borderRadius: 20,
        },
      },
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: "-100%",
        itemStyle: {
          color: "pink",
          borderRadius: 20,
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.sex-container {
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
  .sex {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url("@/assets/images/screen/man-bg.png") no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .women {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url("@/assets/images/screen/woman-bg.png") no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    color: #fff;
  }
  .charts {
    height: 100px;
  }
}
</style>
