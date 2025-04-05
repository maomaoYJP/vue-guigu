<template>
  <div>
    <Category
      @c1Change="getC2List"
      @c2Change="getC3List"
      @getCId="getCId"
      :isAdd="isAdd"
      :c1List="c1List"
      :c2List="c2List"
      :c3List="c3List"
    />
    <el-card style="margin: 10px 0">
      <div v-if="!isAdd">
        <el-button
          type="primary"
          size="default"
          :disabled="addDisabled"
          @click="addOrEditAttr()"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #="{ row }">
              <el-button
                type="primary"
                size="default"
                @click="addOrEditAttr(row)"
                >编辑</el-button
              >
              <el-button type="danger" size="default">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <div>
          <span>属性名称</span>
          <el-input
            placeholder="请输入属性名称"
            style="width: 240px; margin-left: 10px"
          ></el-input>
        </div>
        <div style="margin-top: 10px">
          <el-button type="primary">添加属性</el-button>
          <el-button type="primary" style="margin-left: 10px">取消</el-button>
        </div>
        <el-table border style="margin: 10px 0">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-input
                placeholder="请输入属性值名称"
                style="width: 240px"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="primary" size="default">编辑</el-button>
              <el-button type="danger" size="default">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-button type="primary">保存</el-button>
          <el-button type="primary" style="margin-left: 10px" @click="cancelAdd"
            >取消</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { CategoryObj, Attr } from "@/api/product/attr/types";
import Category from "@/components/Category/index.vue";
import { reqC1, reqC2, reqC3, reqAttr } from "@/api/product/attr";

const c1List = ref<CategoryObj[]>([]);
const c2List = ref<CategoryObj[]>([]);
const c3List = ref<CategoryObj[]>([]);

const addDisabled = ref(true);
const attrList = ref<Attr[]>([]);
const isAdd = ref(false);
const addAttrObj = ref<Attr>({
  attrName: "",
  categoryId: "",
  categoryLevel: 3,
  attrValueList: [],
});

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

const getCId = async (idList: string[]) => {
  addDisabled.value = idList[2] === "";
  try {
    if (idList[2] !== "") {
      const res = await reqAttr(idList[0], idList[1], idList[2]);
      if (res.code === 200) {
        attrList.value = res.data;
      }
    }
  } catch (err) {
    ElMessage.error("获取属性失败");
  }
};

const cancelAdd = () => {
  isAdd.value = false;
};

const addOrEditAttr = (row?: Attr) => {
  isAdd.value = true;
};
</script>

<style scoped></style>
