import request from "@/utils/request";
import type { TradeMarkResponse, TradeMark, Response } from "./types";

enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
}

export const reqGetTrademarkList = (
  page: number,
  limit: number,
  signal: AbortSignal
) =>
  request.get<any, TradeMarkResponse>(API.TRADEMARK_URL + `${page}/${limit}`, {
    signal,
  });

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, Response>(API.UPDATETRADEMARK_URL, data);
  } else {
    return request.post<any, Response>(API.ADDTRADEMARK_URL, data);
  }
};
