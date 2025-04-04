<template>
  <div>
    <el-card>
      <el-form ref="form" :inline="true">
        <el-form-item label="一级分类">
          <el-select style="width: 250px">
            <el-option label="请选择" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select style="width: 250px">
            <el-option label="请选择" value=""></el-option> </el-select
        ></el-form-item>
        <el-form-item label="三级分类"
          ><el-select style="width: 250px">
            <el-option label="请选择" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default"> 添加属性 </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="属性名称" width="120"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
