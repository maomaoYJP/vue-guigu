import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/users";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.user.token) {
      config.headers.token = userStore.user.token;
    }
    return config;
  },
  (err) => {
    ElMessage({
      type: "error",
      message: "请求失败",
    });
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    let message = "";
    let status = error.response.status;
    switch (status) {
      case 401:
        message = "未登录";
        break;
      case 403:
        message = "登录过期，请重新登录";
        break;
      case 404:
        message = "网络请求不存在";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "未知错误";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);

export default request;
