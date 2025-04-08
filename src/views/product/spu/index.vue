<template>
  <el-card>
    <div v-show="changeScene === 0">
      <el-button type="primary" size="default" @click="addSpu"
        >添加SPU</el-button
      >
      <el-table style="margin-top: 10px" border :data="spuData">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column label="SPU名称" prop="spuName" />
        <el-table-column label="SPU描述" prop="description" />
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="primary" size="default">添加</el-button>
            <el-button type="success" size="default">查看</el-button>
            <el-button type="warning" size="default" @click="editSpu(row)"
              >修改</el-button
            >
            <el-button type="danger" size="default">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @current-change="hasSpu"
        @size-change="hasSpu(1)"
      />
    </div>
    <div v-show="changeScene === 1">
      <SpuForm @cancel="changeScene = 0" ref="spuFormRef" />
    </div>
    <div v-show="changeScene === 2">
      <SkuForm @cancel="changeScene = 0" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqHasSpu } from "@/api/product/spu";
import { ref } from "vue";
import type { SpuData } from "@/api/product/spu/types";
import SpuForm from "./components/SpuForm.vue";
import SkuForm from "./components/SkuForm.vue";
const currentPage = ref(1);
const pageSize = ref(3);
const spuData = ref<SpuData[]>([]);
const total = ref(0);
const changeScene = ref(0);
const spuFormRef = ref();
const hasSpu = async (pager = 1) => {
  currentPage.value = pager;
  const res = await reqHasSpu(currentPage.value, pageSize.value);
  if (res.code === 200) {
    spuData.value = res.data.records;
    total.value = res.data.total;
  }
};

onMounted(() => {
  hasSpu();
});
const addSpu = () => {
  changeScene.value = 1;
};
const editSpu = (row: SpuData) => {
  changeScene.value = 1;
  spuFormRef.value.getSpuData(row);
};
</script>

<style scoped></style>
