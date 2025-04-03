import request from "@/utils/request";
import type { LoginFormData, LoginResponse, userInfoResponse } from "./types";

enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponse>(API.LOGIN_URL, data);

export const reqUserInfo = () =>
  request.get<any, userInfoResponse>(API.USERINFO_URL);

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL);
