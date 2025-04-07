import request from "@/utils/request";
import type { HasSpuResponseData } from "./types";

enum API {
  HASSPU_URL = "/admin/product/",
}

export const reqHasSpu = (page: number, limit: number) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=61`
  );
