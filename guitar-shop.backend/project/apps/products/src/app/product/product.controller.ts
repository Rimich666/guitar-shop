import {
  Body,
  Controller, Delete,
  Get,
  Param, ParseIntPipe, Patch,
  Post,
  Query, Response,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {ProductService} from './product.service';
import {JwtAuthGuard} from '@project/shared-enhancers';
import {fillObject} from '@project/util-core';
import {CreateProductDto, ProductFilter, ProductRdo, UpdateProductDto} from '@project/shared-dto';
import { Response as Res } from 'express';


@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.productService.createProduct(dto);
    return fillObject(ProductRdo, newProduct);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async show(@Param('id', ParseIntPipe) productId: number) {
    const product = await this.productService.getProduct(productId);
    return fillObject(ProductRdo, product);
  }

  @Get('/')
  @UsePipes(new ValidationPipe({transform: true}))
  async index(@Query() filters: ProductFilter, @Response() response: Res) {
    const products = await this.productService.getProducts(filters);
    const count = await this.productService.getPageCount(filters);
    return response.set({ 'List-Size': count }).json(fillObject(ProductRdo, products));
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.deleteProduct(id);
    return fillObject(ProductRdo, product);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    const updatedProduct = await this.productService.updateProduct(id, dto);
    return fillObject(ProductRdo, updatedProduct)
  }
}
