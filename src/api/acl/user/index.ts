import request from "@/utils/request";
import type { UserResponseData, User } from "./types";

enum API {
  ALLUSER_URL = "/admin/acl/user/",
  ADDUSER_URL = "/admin/acl/user/save",
  UPDATEUSER_URL = "/admin/acl/user/update",
}

export const reqUserInfo = (page: number, limit: number, username?: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL +
      `${page}/${limit}/` +
      (username ? `?username=${username}` : "")
  );

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data);
  }
};
