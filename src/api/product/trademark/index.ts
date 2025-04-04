import request from "@/utils/request";
import type { TradeMarkResponse } from "./types";

enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
}

export const reqGetTrademarkList = (page: number, limit: number) =>
  request.get<any, TradeMarkResponse>(API.TRADEMARK_URL + `${page}/${limit}`);
