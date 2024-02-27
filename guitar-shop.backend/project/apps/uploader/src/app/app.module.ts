import { Module } from '@nestjs/common';

import { FileModule } from './file/file.module';
import {ConfigUploaderModule} from '@project/uploader-config';
import {getMongooseOptions} from '@project/modules-options';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
  ],
})
export class AppModule {}
