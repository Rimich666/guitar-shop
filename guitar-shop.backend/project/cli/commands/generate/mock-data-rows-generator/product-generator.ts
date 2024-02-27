import {MockData} from '../generate-config.consts';

import {GuitarType, StringCountEnum} from '../../../../libs/shared/shared-types/src';
import {validationConstraints} from '../../../../libs/shared/shared-constants/src';
import {CreateProductDto} from '../../../../libs/shared/shared-dto/src';
import {generateRandomValue, getRandomItem, getRandomSymbols} from "./random";


export default class ProductGenerator {
  constructor(private readonly mockData: MockData) {}
  public generate(): CreateProductDto {
    const keyType =
      getRandomItem(Object.keys(GuitarType)) as keyof typeof GuitarType;
    const keyString =
      getRandomItem(Object.keys(StringCountEnum).filter((key) => isNaN(parseInt(key)))) as keyof typeof StringCountEnum;
    return {
      name: getRandomItem(this.mockData.names),
      guitarType: GuitarType[keyType],
      description: getRandomItem(this.mockData.descriptions),
      idPhoto: getRandomItem(this.mockData.images),
      article: getRandomSymbols(generateRandomValue(
        validationConstraints.product.article.min,
        validationConstraints.product.article.max)).join(''),
      stringsCount: StringCountEnum[keyString],
      price: generateRandomValue(
        validationConstraints.product.price.min,
        validationConstraints.product.price.max),
    }
  }
}
