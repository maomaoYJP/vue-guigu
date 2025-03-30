export interface LoginFormData {
  username: string;
  password: string;
}
export interface Response {
  code?: number;
  message: string;
  ok?: boolean;
}

export interface LoginResponse extends Response {
  data: {
    token?: string;
  };
}
export interface userInfoResponse extends Response {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
