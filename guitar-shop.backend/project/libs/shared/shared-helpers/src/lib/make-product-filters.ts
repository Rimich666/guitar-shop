import {Prisma} from '@prisma/client';
import {ProductFilter} from "@project/shared-dto";
import {GuitarType, StringCountEnum} from "@project/shared-types";

export const makeProductWhere = (query: ProductFilter) => {
  const where: Prisma.ProductsWhereInput = {};
  if (query.stringCount) {
    where.stringsCount = {
      in: query.stringCount.map((key) => StringCountEnum[key])
    };
  }
  if (query.type) {
    where.guitarType = {
      in: query.type.map((key) => GuitarType[key])
    };
  }
  return where;
}


export const makeProductFilters = (query: ProductFilter) => {
  const order: Prisma.SortOrder = Prisma.SortOrder[query.order]
  const orderBy: Prisma.ProductsOrderByWithAggregationInput = {[query.sort]: order};

  return {
    take: query.limit,
    skip: (query.page - 1) * query.limit,
    where: makeProductWhere(query),
    orderBy: orderBy,
  };
}
