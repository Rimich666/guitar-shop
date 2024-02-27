import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { ConfigProductsModule } from '@project/products-config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductModule, ConfigProductsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
