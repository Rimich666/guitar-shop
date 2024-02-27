import {IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';
import {GuitarType, StringCountEnum} from '@project/shared-types';
import {Transform} from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MinLength(validationConstraints.product.name.min)
  @MaxLength(validationConstraints.product.name.max)
  name: string;

  @IsOptional()
  @IsEnum(GuitarType)
  type: GuitarType;

  @IsOptional()
  @IsString()
  @MinLength(validationConstraints.product.description.min)
  @MaxLength(validationConstraints.product.description.max)
  description: string;

  @IsOptional()
  @IsMongoId()
  idPhoto: string;

  @IsOptional()
  @IsString()
  @MinLength(validationConstraints.product.article.min)
  @MaxLength(validationConstraints.product.article.max)
  article: string;

  @IsOptional()
  @IsEnum(StringCountEnum)
  stringsCount: StringCountEnum;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.product.price.min)
  @Max(validationConstraints.product.price.max)
  price: number;
}
