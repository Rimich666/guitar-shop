import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {UserType} from '@project/shared-types';


export type UserDocument = HydratedDocument<UserModel>;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class UserModel implements UserType {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
