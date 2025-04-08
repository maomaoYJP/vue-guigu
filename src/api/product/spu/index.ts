import request from "@/utils/request";
import type {
  HasSpuResponseData,
  TradeMarkResponseData,
  SpuHasImgResponseData,
  SaleAttrResponseData,
  AllSaleAttrResponseData,
  SpuData,
} from "./types";

enum API {
  HASSPU_URL = "/admin/product/",
  ALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  IMAGE_URL = "/admin/product/spuImageList/",
  SPUHASSALEATTR_URL = "/admin/product/spuSaleAttrList/",
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList",
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  UPDATESPU_URL = "/admin/product/updateSpuInfo",
}

export const reqHasSpu = (page: number, limit: number) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=61`
  );

export const reqAllTradeMark = () =>
  request.get<any, TradeMarkResponseData>(API.ALLTRADEMARK_URL);

export const reqSpuImageList = (spuId: string) =>
  request.get<any, SpuHasImgResponseData>(API.IMAGE_URL + spuId);

export const reqSpuHasSaleAttr = (spuId: string) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId);

export const reqAllSalAttr = () =>
  request.get<any, AllSaleAttrResponseData>(API.ALLSALEATTR_URL);

export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};
