import { Injectable } from '@nestjs/common';
import {ProductRepository} from './product.repository';
import {CreateProductDto, ProductFilter, UpdateProductDto} from '@project/shared-dto';
import {Product} from '@project/shared-types';
import {ProductEntity} from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product>{
    return this.productRepository.create(new ProductEntity(dto));
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    return this.productRepository.update(id, new ProductEntity(dto));
  }

  async getProduct(id: number) {
    return this.productRepository.findById(id);
  }

  async getProducts(filters: ProductFilter) {
    return this.productRepository.find(filters);
  }

  async getPageCount(filters: ProductFilter) {
    return Math.ceil(await this.productRepository.count(filters) / filters.limit);
  }

  async deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }
}
