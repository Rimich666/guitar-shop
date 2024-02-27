import {Module} from '@nestjs/common';

import { ProductsController } from './products.controller';
import { UsersController } from './users.controller';
import { FileController } from './file.controller';
import {ConfigBffModule} from '@project/bff-config';
import {HttpModule} from '@nestjs/axios';
import {getHttpOptions} from '@project/modules-options';
import {BffService} from './bff.service';

@Module({
  imports: [
    ConfigBffModule,
    HttpModule.registerAsync(getHttpOptions('http')),
  ],
  controllers: [
    ProductsController,
    UsersController,
  ],
  providers: [BffService, FileController,],
})
export class AppModule {}
