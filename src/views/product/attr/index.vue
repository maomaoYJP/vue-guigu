<template>
  <div>
    <Category
      @c1Change="getC2List"
      @c2Change="getC3List"
      @getCId="(idList) => (addDisabled = idList[2] === '')"
      :c1List="c1List"
      :c2List="c2List"
      :c3List="c3List"
    />
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" :disabled="addDisabled">
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="属性名称" width="120"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { CategoryObj } from "@/api/product/attr/types";
import Category from "@/components/Category/index.vue";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";

const c1List = ref<CategoryObj[]>([]);
const c2List = ref<CategoryObj[]>([]);
const c3List = ref<CategoryObj[]>([]);

const addDisabled = ref(true);

const getC1List = async () => {
  try {
    const res = await reqC1();
    if (res.code === 200) {
      c1List.value = res.data;
    }
  } catch (err) {
    ElMessage.error("获取一级分类失败");
  }
};

onMounted(() => {
  getC1List();
});

const getC2List = async (c1Id: string) => {
  try {
    c2List.value = [];
    c3List.value = [];
    const res = await reqC2(c1Id);
    if (res.code === 200) {
      c2List.value = res.data;
    }
  } catch (err) {
    ElMessage.error("获取二级分类失败");
  }
};

const getC3List = async (c2Id: string) => {
  try {
    c3List.value = [];
    const res = await reqC3(c2Id);
    if (res.code === 200) {
      c3List.value = res.data;
    }
  } catch (err) {
    ElMessage.error("获取三级分类失败");
  }
};
</script>

<style scoped></style>
