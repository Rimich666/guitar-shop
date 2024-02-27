import {GuitarType} from './type.enum';
import {StringCountEnum} from './string-count.enum';

export interface Product {
  id?: number;
  name?: string;
  guitarType?: GuitarType;
  createDate?: Date;
  description?: string;
  idPhoto: string;
  article?: string;
  stringsCount?: StringCountEnum;
  price?: number;
}
