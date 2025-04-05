import request from "@/utils/request";
import type {
  CategoryResponse,
  AttrResponseData,
  ResponseData,
  Attr,
} from "./types";
enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
  ATTR_URL = "/admin/product/attrInfoList/",
  ADDORUPDATEATTR_URL = "/admin/product/saveAttrInfo",
}

export const reqC1 = () => request.get<any, CategoryResponse>(API.C1_URL);

export const reqC2 = (category1Id: string) =>
  request.get<any, CategoryResponse>(API.C2_URL + category1Id);

export const reqC3 = (category2Id: string) =>
  request.get<any, CategoryResponse>(API.C3_URL + category2Id);

export const reqAttr = (
  category1Id: string,
  category2Id: string,
  category3Id: string
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  );

export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, ResponseData>(API.ADDORUPDATEATTR_URL, data);
