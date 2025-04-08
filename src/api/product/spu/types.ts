export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SpuData {
  id?: string;
  spuName: string;
  description: string;
  category3Id: number;
  tmId: string;
  spuSaleAttrList: SaleAttr[];
  spuImageList: SpuImg[];
}

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: SpuData[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

export interface Trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}

export interface TradeMarkResponseData extends ResponseData {
  data: Trademark[];
}

export interface SpuImg {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  name?: string;
  url?: string;
}

export interface SpuHasImgResponseData extends ResponseData {
  data: SpuImg[];
}

export interface SaleAttrValue {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: string;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}

export interface SaleAttr {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SaleAttrValue[];
  flag?: boolean;
  saleAttrValue?: string;
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}

export interface Attr {
  attrId: string;
  valueId: string;
}

export interface saleAttr {
  saleAttrId: string;
  saleAttrValueId: string;
}

export interface AllSaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

export interface SkuData {
  category3Id: string;
  spuId: string;
  tmId: string;
  skuName: string;
  price: string;
  weight: string;
  skuDesc: string;
  skuAttrValueList?: Attr[];
  skuSaleAttrValueList?: saleAttr[];
  skuDefaultImg: string;
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}
