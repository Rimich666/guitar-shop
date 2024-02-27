import {GuitarType, StringCountEnum} from '@project/shared-types';
import {Expose} from 'class-transformer';

export class ProductRdo {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  guitarType: GuitarType;

  @Expose()
  createDate: Date;

  @Expose()
  description: string;

  @Expose()
  idPhoto: string;

  @Expose()
  article: string;

  @Expose()
  stringsCount: StringCountEnum;

  @Expose()
  price: number;
}
