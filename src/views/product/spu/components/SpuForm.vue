<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" />
    </el-form-item>
    <el-form-item label="品牌">
      <el-select placeholder="请选择品牌">
        <el-option label="品牌1" value="1" />
        <el-option label="品牌2" value="2" />
        <el-option label="品牌3" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述" />
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload list-type="picture-card">
        <SvgIcon name="plus" />
      </el-upload>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select placeholder="请选择销售属性" style="width: 200px">
        <el-option label="颜色" value="1" />
        <el-option label="版本" value="2" />
        <el-option label="尺码" value="3" />
      </el-select>
      <el-button style="margin-left: 10px" type="primary" size="default"
        >添加</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-table border>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column label="销售属性名称" />
        <el-table-column label="销售属性值" />
        <el-table-column label="操作" />
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type {
  SpuData,
  Trademark,
  SpuImg,
  SaleAttr,
} from "@/api/product/spu/types";
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSalAttr,
} from "@/api/product/spu";
const emit = defineEmits(["cancel"]);
const cancel = () => {
  emit("cancel", 0);
};

const allTradeMark = ref<Trademark[]>([]);
const spuImageList = ref<SpuImg[]>([]);
const saleAttr = ref<SaleAttr[]>([]);
const allSaleAttr = ref<SaleAttr[]>([]);

const getSpuData = async (row: SpuData) => {
  let allTradeMarkData = await reqAllTradeMark();
  let spuImageListData = await reqSpuImageList(row.id as string);
  let saleAttrData = await reqSpuHasSaleAttr(row.id as string);
  let allSaleAttrData = await reqAllSalAttr();
  allTradeMark.value = allTradeMarkData.data;
  spuImageList.value = spuImageListData.data;
  saleAttr.value = saleAttrData.data;
  allSaleAttr.value = allSaleAttrData.data;
};

defineExpose({
  getSpuData,
});
</script>

<style scoped></style>
