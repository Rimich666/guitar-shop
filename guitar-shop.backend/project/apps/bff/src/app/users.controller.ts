import {Body, Controller, Get, Inject, Post, UseFilters} from '@nestjs/common';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {CreateUserDto, LoginUserDto, UserRdo} from '@project/shared-dto';
import {fillObject, getAuthHeader} from '@project/util-core';
import {HttpService} from '@nestjs/axios';
import {Origin, Token} from '@project/shared-enhancers';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const url = this.config.users;
    const { data } = await this.httpService.axiosRef.post(`${url}/login`, loginUserDto);
    return data;
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto, @Origin() origin: string){
    const { data } = await this.httpService.axiosRef.post(`${this.config.users}/register`, {...createUserDto},
      {headers: {'origin': origin}
  });
    return fillObject(UserRdo, {...data});
  }

  @Get('verify')
  public async getUser(@Token() token: string){
    const {data} = await this.httpService.axiosRef.get(`${this.config.users}/verify`, getAuthHeader(token));
    return data;
  }
}
