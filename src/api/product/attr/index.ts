import request from "@/utils/request";
import type { CategoryResponse } from "./types";
enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
}

export const reqC1 = () => request.get<any, CategoryResponse>(API.C1_URL);

export const reqC2 = (category1Id: string) =>
  request.get<any, CategoryResponse>(API.C2_URL + category1Id);

export const reqC3 = (category2Id: string) =>
  request.get<any, CategoryResponse>(API.C3_URL + category2Id);
