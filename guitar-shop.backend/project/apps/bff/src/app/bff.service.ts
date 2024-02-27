import {Inject, Injectable} from '@nestjs/common';
import {fillObject, getAuthHeader} from '@project/util-core';
import {HttpService} from '@nestjs/axios';
import {ConfigType} from '@nestjs/config';
import {appsConfig} from '@project/configurations';
import {FullProductRdo} from '@project/shared-dto';
import {Product} from '@project/shared-types';
import { Response as Res } from 'express';

@Injectable()
export class BffService {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  public async getPath(idFile: string) {
    const file = await this.httpService.axiosRef.get(`${this.config.files}/${idFile}`);
    return file.data.path;
  }

  private async stickPathPhoto(product: Product) {
    const photo = product.idPhoto === undefined ? '' : await this.getPath(product.idPhoto);
    return {...product, urlPhoto: photo};
  }

  public async getProduct(id: number, token: string){
    const {data} = await this.httpService.axiosRef.get(`${this.config.products}/${id}`, getAuthHeader(token));
    return fillObject(FullProductRdo, await this.stickPathPhoto(data));
  }

  public async getProducts(filters: string, response: Res) {
    const {data, headers} = await this.httpService.axiosRef.get(`${this.config.products}${filters}`);
    const promises = data.map((item: Product) => this.stickPathPhoto(item));
    return response.set({ 'List-Size': headers['list-size']}).json(fillObject(FullProductRdo, await Promise.all(promises)));
  }
}
