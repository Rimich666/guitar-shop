import {Expose} from 'class-transformer';
import {GuitarType, StringCountEnum} from '@project/shared-types';

export class FullProductRdo {
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
  urlPhoto: string;

  @Expose()
  article: string;

  @Expose()
  stringsCount: StringCountEnum;

  @Expose()
  price: number;
}
