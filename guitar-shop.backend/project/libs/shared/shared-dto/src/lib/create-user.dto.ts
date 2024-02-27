import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(validationConstraints.user.name.min)
  @MaxLength(validationConstraints.user.name.max)
  public name: string;

  @IsString()
  @MinLength(validationConstraints.user.password.min)
  @MaxLength(validationConstraints.user.password.max)
  public password: string;
}
