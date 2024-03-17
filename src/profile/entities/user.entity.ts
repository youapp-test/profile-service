import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true, type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, enum: Role })
  role: string = Role.USER;
}

export const UserSchema = SchemaFactory.createForClass(User);
