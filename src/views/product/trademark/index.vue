<template>
  <el-card>
    <el-button type="primary">添加品牌</el-button>
    <div v-loading="isLoading" element-loading-text="数据加载中...">
      <el-table border class="table-container" :data="trademarkList">
        <template #empty>
          <div class="empty-container">
            <el-button
              type="primary"
              size="default"
              @click="getTrademarkList(currentPage)"
              >刷新</el-button
            >
          </div>
        </template>
        <el-table-column label="序号" width="100" align="center" type="index" />
        <el-table-column label="品牌名称">
          <template #default="scope">
            <div>{{ scope.row.tmName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="品牌logo">
          <template #default="scope">
            <img
              :src="scope.row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="scope">
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper, ->,sizes, total,"
      :total="total"
      @current-change="getTrademarkList"
      @size-change="getTrademarkList"
    />
  </el-card>
</template>

<script setup lang="ts">
import { reqGetTrademarkList } from "@/api/product/trademark";
import type { TradeMark } from "@/api/product/trademark/types";
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(400);
const trademarkList = ref<TradeMark[]>([]);
const isLoading = ref(false);
const controller = ref<AbortController | null>(null);

const getTrademarkList = async (pager = 1) => {
  try {
    if (controller.value) controller.value.abort();
    controller.value = new AbortController();
    const signal = controller.value.signal;
    isLoading.value = true;
    currentPage.value = pager;
    const res = await reqGetTrademarkList(
      currentPage.value,
      pageSize.value,
      signal
    );
    if (res.code === 200) {
      total.value = res.data.total;
      trademarkList.value = res.data.records;
    }
  } catch (error) {
    trademarkList.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getTrademarkList();
});
</script>

<style scoped lang="scss">
.table-container {
  margin: 20px 0;
}
</style>
