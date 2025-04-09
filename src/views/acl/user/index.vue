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
      <el-button type="primary" size="default" @click="drawer = true"
        >添加</el-button
      >
      <el-button type="danger" size="default">批量删除</el-button>
      <el-table border style="margin-top: 10px" :data="userInfoList">
        <el-table-column type="selection" width="55" />
        <el-table-column label="#" width="60" type="index" />
        <el-table-column label="id" width="60" prop="id" />
        <el-table-column label="用户名字" prop="username" />
        <el-table-column label="用户名称" prop="name" />
        <el-table-column label="用户角色" prop="roleName" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="更新时间" prop="updateTime" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="assignRole(row)"
              >分配角色</el-button
            >
            <el-button type="warning" size="small" @click="updateUser(row)"
              >编辑</el-button
            >
            <el-button type="danger" size="small">删除</el-button>
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
        @current-change="getUserInfo"
        @size-change="getUserInfo(1)"
      />
    </el-card>
    <el-drawer v-model="drawer" title="编辑用户" direction="rtl">
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userAddOrUpdate.username" />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="userAddOrUpdate.name" />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="userAddOrUpdate.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="addOrUpdateUser"
            >保存</el-button
          >
          <el-button type="primary" size="default" @click="drawer = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer v-model="assignRoleDrawer">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input :disabled="true" :value="assignRoleDrawerData.username" />
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox> 全选 </el-checkbox>
            <el-checkbox-group>
              <el-checkbox
                v-for="(role, index) in 10"
                :key="index"
                :label="role"
                :value="role"
              >
                {{ role }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button>保存</el-button>
          <el-button type="primary">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(0);
const drawer = ref(false);

import type { User } from "@/api/acl/user/types";
import { reqUserInfo, reqAddOrUpdateUser } from "@/api/acl/user";
const userInfoList = ref<User[]>([]);
const userAddOrUpdate = ref<User>({
  username: "",
  name: "",
  password: "",
});

const getUserInfo = (pager = 1) => {
  currentPage.value = pager;
  reqUserInfo(currentPage.value, pageSize.value).then((res) => {
    userInfoList.value = res.data.records;
    total.value = res.data.total;
  });
};

onMounted(() => {
  getUserInfo();
});

const updateUser = (row: User) => {
  const { username, name, password } = row;
  userAddOrUpdate.value = { username, name, password };
  drawer.value = true;
};

const addOrUpdateUser = async () => {
  const res = await reqAddOrUpdateUser(userAddOrUpdate.value);
  if (res.code === 200) {
    drawer.value = false;
    getUserInfo();
  }
};

const assignRoleDrawer = ref(false);
const assignRoleDrawerData = ref<any>({
  username: "",
  role: [],
});
const assignRole = (row: User) => {
  assignRoleDrawerData.value.username = row.username;
  assignRoleDrawer.value = true;
};
</script>

<style scoped></style>
