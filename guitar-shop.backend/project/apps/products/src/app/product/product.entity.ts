import {Entity} from '@project/util-types';
import {GuitarType, Product, StringCountEnum} from '@project/shared-types';

export class ProductEntity implements Entity<ProductEntity>, Product {
  public id?: number;
  public name: string;
  public guitarType: GuitarType;
  public createDate: Date;
  public description: string;
  public idPhoto: string;
  public article: string;
  public stringsCount: StringCountEnum;
  public price: number;

  constructor(post: Product) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Product) {
    this.name = entity.name;
    this.guitarType = entity.guitarType;
    this.createDate = entity.createDate;
    this.description = entity.description;
    this.idPhoto = entity.idPhoto;
    this.article = entity.article;
    this.stringsCount = entity.stringsCount;
    this.price = entity.price;
  }

  public toObject(): ProductEntity {
    return {
      ...this,
    };
  }
}
