import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {ProductRepository} from './product.repository';
import {PrismaService} from '../prisma/prisma.service';
import {JwtAccessStrategy} from '@project/util-core';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    PrismaService,
    JwtAccessStrategy
  ],
})
export class ProductModule {}
