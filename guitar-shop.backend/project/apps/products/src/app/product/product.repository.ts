import {Injectable} from '@nestjs/common';
import {GuitarType, Product} from '@project/shared-types';
import {ProductEntity} from './product.entity';
import {CRUDRepository} from '@project/util-types';
import {PrismaService} from '../prisma/prisma.service';
import {ProductFilter} from '@project/shared-dto';
import {makeProductFilters, makeProductWhere} from '@project/shared-helpers';

@Injectable()
export class ProductRepository implements CRUDRepository<ProductEntity, number, Product> {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


  public async create(item: ProductEntity): Promise<Product> {
    const entityData = item.toObject();
    const product = await this.prisma.products.create({
      data: {
        ...entityData,
      }
    });
    return {...product, guitarType: product.guitarType as GuitarType};
  }

  public async find(queryFilters: ProductFilter): Promise<Product[]> {
    const filters = makeProductFilters(queryFilters);
    const products = await this.prisma.products.findMany(filters);
    return products.map((product) => ({...product, guitarType: product.guitarType as GuitarType}));
  }


  public async delete(id: number): Promise<Product> {
    const product = await this.prisma.products.delete({
      where: {
        id,
      }
    });
    return {...product, guitarType: product.guitarType as GuitarType};
  }

  public async findById(id: number): Promise<Product> {
    const product = await this.prisma.products.findFirstOrThrow({
      where: {id: id},
    });
    return {...product, guitarType: product.guitarType as GuitarType};
  }

  public async update(id: number, item: ProductEntity): Promise<Product> {
    const product = await this.prisma.products.update(
      {
        where: {id},
        data: item,
      }
    );
    return {...product, guitarType: product.guitarType as GuitarType};
  }

  public async count(queryFilters: ProductFilter): Promise<number> {
    const filters = makeProductWhere(queryFilters);
    return this.prisma.products.count({where: filters});
  }
}
