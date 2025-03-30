<template>
  <div class="login-container">
    <div class="login-box">
      <h1>登 录</h1>
      <el-form :model="form" label-width="auto" :inline="false">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-button
          :loading="loading"
          class="login-btn"
          type="primary"
          @click="login"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useUserStore from "@/store/modules/users";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const form = ref<{ username: string; password: string }>({
  username: "admin",
  password: "123456",
});
const loading = ref(false);

const login = async () => {
  try {
    loading.value = true;
    const result = await userStore.login(form.value);
    if (result === "success") {
      router.push("/");
      ElNotification({
        type: "success",
        message: "登录成功",
      });
    }
  } catch (err) {
    ElNotification({
      type: "error",
      message: "登录失败",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
