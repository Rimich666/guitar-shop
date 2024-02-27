import {UserEntity} from './user.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserType} from '@project/shared-types';
import {UserModel} from '@project/user-models';

export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }
  create(item: UserEntity): Promise<UserType> {
    const user = new this.userModel(item);
    return user.save();
  }

  findById(id: string): Promise<UserType | null> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({email});
  }
}
