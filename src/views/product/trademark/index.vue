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
          <el-table-column label="序号" width="100" align="center" prop="id" />
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
              <el-button
                type="primary"
                size="small"
                @click="editTrademark(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="deleteTrademark(scope.row.id)"
                >删除</el-button
              >
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
      <el-form
        :model="productUploadForm"
        :rules="productUploadFormRules"
        ref="productUploadFormRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="productUploadForm.tmName"
            placeholder="请输入品牌名称"
          />
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :on-error="handleAvatarError"
          >
            <img
              v-if="productUploadForm.logoUrl"
              :src="productUploadForm.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <SvgIcon name="plus" />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="addTrademark"
            :loading="addTrademarkLoading"
          >
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reqGetTrademarkList,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark";
import type { TradeMark } from "@/api/product/trademark/types";
import type { FormInstance } from "element-plus";
import SvgIcon from "@/components/SvgIcon/index.vue";
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(400);
const trademarkList = ref<TradeMark[]>([]);
const isLoading = ref(false);
const controller = ref<AbortController | null>(null);
const dialogVisible = ref(false);
const productUploadForm = ref<TradeMark>({
  tmName: "",
  logoUrl: "",
});
const addTrademarkLoading = ref(false);
const productUploadFormRef = ref<FormInstance>();

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

const addTrademark = async () => {
  try {
    await productUploadFormRef.value?.validate();
    addTrademarkLoading.value = true;
    const res = await reqAddOrUpdateTrademark(productUploadForm.value);
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: "添加成功",
      });
      dialogVisible.value = false;
      productUploadForm.value = {
        id: 0,
        tmName: "",
        logoUrl: "",
      };
      getTrademarkList(currentPage.value);
      return;
    }
    throw new Error(res.message);
  } catch (error) {
    ElMessage({
      type: "error",
      message: "添加失败",
    });
  } finally {
    addTrademarkLoading.value = false;
  }
};

const editTrademark = (row: TradeMark) => {
  dialogVisible.value = true;
  const { id, tmName, logoUrl } = row;
  productUploadForm.value = { id, tmName, logoUrl };
};

const deleteTrademark = async (id: number) => {
  try {
    const res = await reqDeleteTrademark(id);
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      getTrademarkList(currentPage.value);
      return;
    }
    throw new Error(res.message);
  } catch (error) {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

const handleAvatarSuccess = (res: any) => {
  productUploadForm.value.logoUrl = res.data;
};

const beforeAvatarUpload = (rawFile: File) => {
  if (
    rawFile.type === "image/png" ||
    rawFile.type === "image/jpeg" ||
    rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传的文件大小应小于4M",
      });
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传的文件类型必须是PNG|JPG|GIF",
    });
    return false;
  }
};

const handleAvatarError = (_: any) => {
  ElMessage({
    type: "error",
    message: "上传失败",
  });
};

const validateLogoUrl = (_: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请上传品牌logo"));
  } else {
    callback();
  }
};

const productUploadFormRules = ref({
  tmName: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
  logoUrl: [
    { required: true, message: "请上传品牌logo", trigger: "blur" },
    { validator: validateLogoUrl, trigger: "blur" },
  ],
});
</script>

<style scoped lang="scss">
.table-container {
  margin: 20px 0;
}

.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
  object-fit: cover;
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
