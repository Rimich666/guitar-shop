import {Body, Controller, Get, Param, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {UserType} from '@project/shared-types';
import {fillObject} from '@project/util-core';
import {CreateUserDto, UserRdo} from '@project/shared-dto';
import {LocalAuthGuard} from './local-auth-guard';
import {JwtAuthGuard, User, UserId} from '@project/shared-enhancers';
import {NotifyService} from '../notify/notify.service';
import {Origin} from '@project/shared-enhancers';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    public notifyService: NotifyService
  ) {}

  @Post('register')
  public async register(@Body(ValidationPipe) createUserDto: CreateUserDto, @Origin() origin: string){
    const user = await this.userService.register(createUserDto);
    await this.notifyService.registerUser({...createUserDto, url: origin});
    return fillObject(UserRdo, user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(@User() user: UserType){
    return await this.userService.createUserToken(user);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  public async getUser(@UserId('id') id: string){
    const user = await this.userService.getUser(id);
    return fillObject(UserRdo, user);
  }
}
