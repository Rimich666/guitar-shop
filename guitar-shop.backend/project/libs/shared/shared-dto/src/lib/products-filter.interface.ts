import {IsEnum, IsNumber, IsOptional} from 'class-validator';
import {Transform} from 'class-transformer';
import {
  DEFAULT_ORDER,
  DEFAULT_SORT,
  PRODUCT_RESPONSE_PAGE_LIMIT,
  SortFieldsEnum,
  SortOrder
} from '@project/shared-constants';
import {GuitarType, StringCountEnum} from '@project/shared-types';

export class ProductFilter {
  @IsOptional()
  @IsEnum(SortFieldsEnum)
  public sort: string = DEFAULT_SORT;

  @IsOptional()
  @IsEnum(SortOrder)
  public order: string = DEFAULT_ORDER;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  public limit: number = PRODUCT_RESPONSE_PAGE_LIMIT;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  public page = 1;

  @IsOptional()
  @IsEnum(Object.keys(GuitarType), { each : true})
  @Transform((params) => params.value.split(','))
  public type: string[];

  @IsOptional()
  @IsEnum(Object.keys(StringCountEnum).filter((key) => isNaN(parseInt(key))), { each : true})
  @Transform((params) => params.value.split(','))
  public stringCount: string[];
}
