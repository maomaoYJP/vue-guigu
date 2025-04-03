<template>
  <div class="login-container">
    <div class="login-box">
      <h1>登 录</h1>
      <el-form
        :model="form"
        :rules="loginFormRules"
        label-width="auto"
        :inline="false"
        ref="loginFormRef"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
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
import { reqLogin, reqUserInfo } from "@/api/user";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";

const userStore = useUserStore();
const router = useRouter();

interface loginForm {
  username: string;
  password: string;
}

const form = ref<loginForm>({
  username: "admin",
  password: "111111",
});

const loginFormRef = ref<FormInstance>();
const loading = ref(false);

const passwordValidator = (_: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("密码至少4位"));
  }
};

const loginFormRules = ref<FormRules<loginForm>>({
  username: [
    {
      required: true,
      min: 3,
      max: 10,
      message: "账号至少六位",
      trigger: "change",
    },
  ],
  password: [
    { required: true, trigger: "change", validator: passwordValidator },
  ],
});

const login = async () => {
  try {
    loading.value = true;
    await loginFormRef.value?.validate();
    const user = userStore.user;
    const result = await reqLogin(form.value);
    if (result.code === 200) {
      user.token = result.data || "";
      localStorage.setItem("token", user.token);
      const info = await reqUserInfo();
      user.username = info.data.name;
      user.avatar = info.data.avatar;
      router.push((router.currentRoute.value.query.redirect as string) || "/");
      ElNotification({
        type: "success",
        message: "登录成功",
      });
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    userStore.resetUser();
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
