import {
  Body,
  Controller, Delete,
  Get, Inject,
  Param, ParseFilePipe,
  ParseIntPipe, Patch,
  Post, Response,
  UploadedFile, UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {JpgPngValidator, JsonPipe, QueryRaw, Token} from '@project/shared-enhancers';
import {CreateProductDto, FullProductRdo, ProductRdo, UpdateProductDto} from '@project/shared-dto';
import {fillObject, getAuthHeader} from '@project/util-core';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {FileInterceptor} from '@nestjs/platform-express';
import {FileController} from './file.controller';
import {BffService} from './bff.service';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import { Response as Res } from 'express';

@Controller('products')
@UseFilters(AxiosExceptionFilter)
export class ProductsController {
constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly fileController: FileController,
    private readonly bffService: BffService,
  ) {}
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body('product', JsonPipe) dto: CreateProductDto,
    @Token() token: string,
    @UploadedFile(new ParseFilePipe({validators: [new JpgPngValidator({})]})) file: Express.Multer.File) {

    const image = await this.fileController.upload(file);
    const {data} = await this.httpService.axiosRef.post(
      `${this.config.products}`, {...dto, idPhoto: image.id}, getAuthHeader(token));
    return fillObject(FullProductRdo, data);
  }

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) productId: number, @Token() token: string) {
    return this.bffService.getProduct(productId, token);
  }

  @Get('/')
  async index(@QueryRaw() filters: string, @Response() response: Res) {
    return this.bffService.getProducts(filters, response);
  }

  @Delete('/:id')
  async destroy(@Param('id', ParseIntPipe) id: number, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.delete(`${this.config.products}/${id}`, getAuthHeader(token));
    return fillObject(FullProductRdo, data);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Token() token: string,
    @Body('product', JsonPipe) dto: UpdateProductDto,
    @UploadedFile(new ParseFilePipe({
      validators: [new JpgPngValidator({})],
      fileIsRequired: false
    })) file: Express.Multer.File)
    {
      if (file) {
        const image = await this.fileController.upload(file);
        if (image) {
          dto.idPhoto = image.id;
        }
      }
      const {data} = await this.httpService.axiosRef.patch(`${this.config.products}/${id}`, dto, getAuthHeader(token));
    return fillObject(ProductRdo, data);
  }
}
