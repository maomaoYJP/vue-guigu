import axios, { type InternalAxiosRequestConfig } from "axios";
import useUserStore from "@/store/modules/users";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}

// 最大重试次数
const MAX_RETRIES = 3;
// 重试间隔时间（毫秒）
const RETRY_DELAY = 500;

request.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const userStore = useUserStore();
    config.retryCount = config.retryCount || 0;
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
    const config = error.config;
    let message = "";
    let status = error?.response?.status || null;
    if (error.code === "ECONNABORTED") status = 408;
    if (error.code === "ERR_CANCELED") return Promise.reject(error);
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
      case 408:
        message = "请求超时";
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
    if (config && config.retryCount < MAX_RETRIES) {
      config.retryCount++;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(request(config));
        }, RETRY_DELAY);
      });
    }

    return Promise.reject(error);
  }
);

export default request;
