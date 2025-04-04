export interface Response {
  code: number;
  message: string;
  ok: boolean;
  data: any;
}

export interface TradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

export interface TradeMarkResponse extends Response {
  data: {
    records: TradeMark[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
