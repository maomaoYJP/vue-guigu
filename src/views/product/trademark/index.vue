<template>
  <el-card>
    <el-button type="primary">添加品牌</el-button>
    <el-table border class="table-container">
      <el-table-column label="序号" width="100" align="center" />
      <el-table-column label="品牌名称" />
      <el-table-column label="品牌logo" />
      <el-table-column label="品牌操作" />
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper, ->,sizes, total,"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(400);
</script>

<style scoped lang="scss">
.table-container {
  margin: 20px 0;
}
</style>
