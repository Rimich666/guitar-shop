export const PRODUCT_RESPONSE_PAGE_LIMIT= 7;

export enum SortFieldsEnum {
  price = 'price',
  createDate = 'createDate'
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}

export const DEFAULT_SORT = SortFieldsEnum.createDate;
export const DEFAULT_ORDER = SortOrder[SortOrder.desc];
