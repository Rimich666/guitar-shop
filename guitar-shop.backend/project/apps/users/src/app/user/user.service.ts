import {ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {jwtUsersConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {UserType} from '@project/shared-types';
import {UserExceptionMessage} from '@project/shared-constants';
import {UserEntity} from './user.entity';
import {CreateUserDto, LoginUserDto} from '@project/shared-dto';
import {createJWTPayload} from '@project/util-core';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject (jwtUsersConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtUsersConfig>,
    private jwtService: JwtService,
  ) {}

  public async register(dto: CreateUserDto): Promise<UserType> {
    const {email, name, password} = dto;

    const user = {
      email, name,
      password: '',
    };
    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(UserExceptionMessage.UserExists);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password);
    return this.userRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existedUser = await this.userRepository.findByEmail(email);

    if (!existedUser) {
      throw new NotFoundException(UserExceptionMessage.UserNotFound);
    }

    const userEntity = new UserEntity(existedUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(UserExceptionMessage.UserPasswordWrong);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  public async createUserToken(user: UserType) {
    const accessTokenPayload = createJWTPayload(user);
    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload, {
        secret: this.jwtOptions.accessTokenSecret,
        expiresIn: this.jwtOptions.accessTokenExpiresIn
      })
    };
  }
}
