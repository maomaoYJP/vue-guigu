export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
  data: any;
}

export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

export interface CategoryResponse extends ResponseData {
  data: CategoryObj[];
}

export interface AttrValue {
  id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean;
}

export interface Attr {
  id?: number;
  attrName: string;
  categoryId: string;
  categoryLevel: number;
  attrValueList: AttrValue[];
}

export interface AttrResponseData extends ResponseData {
  data: Attr[];
}
