import {GuitarType, StringCountEnum} from '@project/shared-types';
import {IsEnum, IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';
import {Transform} from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @MinLength(validationConstraints.product.name.min)
  @MaxLength(validationConstraints.product.name.max)
  name: string;

  @IsEnum(GuitarType)
  guitarType: GuitarType;

  @IsString()
  @MinLength(validationConstraints.product.description.min)
  @MaxLength(validationConstraints.product.description.max)
  description: string;

  @IsMongoId()
  idPhoto: string;

  @IsString()
  @MinLength(validationConstraints.product.article.min)
  @MaxLength(validationConstraints.product.article.max)
  article: string;

  @IsEnum(StringCountEnum)
  stringsCount: StringCountEnum;

  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.product.price.min)
  @Max(validationConstraints.product.price.max)
  price: number;
}
