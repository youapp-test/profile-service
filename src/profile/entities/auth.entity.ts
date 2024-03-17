import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ required: true, type: Types.ObjectId })
  user: Types.ObjectId;

  @Prop({ required: true, unique: true })
  access_token_hash: string;

  @Prop({ required: true })
  exp: number;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
