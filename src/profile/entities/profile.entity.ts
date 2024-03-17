import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.entity';

export type ProfileDocument = HydratedDocument<Profile>;

enum Gender {
  UNDEFINED = '',
  MALE = 'male',
  FEMALE = 'female',
}

enum HeightMeasurements {
  INCHES = 'inches',
  CENTIMETERS = 'centimeters',
}

interface HeightObject {
  number: number;
  measurements: HeightMeasurements;
}

enum WeightMeasurements {
  KILOGRAM = 'kilogram',
}

interface WeightObject {
  number: number;
  measurements: WeightMeasurements;
}

@Schema()
export class Profile {
  @Prop({ required: true, unique: true })
  user: User;

  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  gender: Gender;

  @Prop({ default: null })
  date_of_birth: Date;

  @Prop({
    type: Object,
    default: {
      number: null,
      measurements: HeightMeasurements.CENTIMETERS,
    },
  })
  height: HeightObject;

  @Prop({
    type: Object,
    default: {
      number: null,
      measurements: WeightMeasurements.KILOGRAM,
    },
  })
  weight: WeightObject;

  @Prop({ default: null })
  image: string;

  @Prop({ default: null })
  horoscope: string;

  @Prop({ default: null })
  zodiac: string;

  @Prop({})
  interest: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
