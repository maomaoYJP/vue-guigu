import request from "@/utils/request";
import type { LoginFormData, LoginResponse, userInfoResponse } from "./types";

enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

export const login = (data: LoginFormData) => {
  return request.post<any, LoginResponse>(API.LOGIN_URL, data);
};

export const getUserInfo = () => {
  return request.get<any, userInfoResponse>(API.USERINFO_URL);
};
