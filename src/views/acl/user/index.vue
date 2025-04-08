<template>
  <div>
    <el-card>
      <div style="display: flex; justify-content: space-between">
        <div>
          <label>用户名:</label>
          <el-input
            style="width: 300px; margin-left: 10px"
            placeholder="请输入用户名"
          />
        </div>
        <div>
          <el-button type="primary" size="default">搜索</el-button>
          <el-button type="primary" size="default">重置</el-button>
        </div>
      </div>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-button type="primary" size="default">添加</el-button>
      <el-button type="danger" size="default">批量删除</el-button>
      <el-table border style="margin-top: 10px">
        <el-table-column type="selection" width="55" />
        <el-table-column label="#" width="60" />
        <el-table-column label="id" width="60" />
        <el-table-column label="用户名字" />
        <el-table-column label="用户名称" />
        <el-table-column label="用户角色" />
        <el-table-column label="创建时间" />
        <el-table-column label="更新时间" />
        <el-table-column label="操作" />
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="4"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1);
const pageSize = ref(3);
</script>

<style scoped></style>
