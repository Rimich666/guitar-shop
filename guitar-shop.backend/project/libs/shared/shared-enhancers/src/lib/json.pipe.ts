import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class JsonPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    return JSON.parse(value);
  }
}
