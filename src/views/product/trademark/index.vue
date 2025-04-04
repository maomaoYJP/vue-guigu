<template>
  <div>
    <el-card>
      <el-button type="primary" @click="dialogVisible = true"
        >添加品牌</el-button
      >
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
          <el-table-column
            label="序号"
            width="100"
            align="center"
            type="index"
          />
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
    <el-dialog v-model="dialogVisible" title="添加品牌" width="500">
      <el-form>
        <el-form-item label="品牌名称">
          <el-input placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="品牌logo">
          <el-upload class="avatar-uploader">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <SvgIcon name="plus" />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqGetTrademarkList } from "@/api/product/trademark";
import type { TradeMark } from "@/api/product/trademark/types";
import SvgIcon from "@/components/SvgIcon/index.vue";
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(400);
const trademarkList = ref<TradeMark[]>([]);
const isLoading = ref(false);
const controller = ref<AbortController | null>(null);
const dialogVisible = ref(false);
const imageUrl = ref("");

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
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
