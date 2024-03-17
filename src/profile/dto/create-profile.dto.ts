import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDate,
  ValidateNested,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../entities/user.entity';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

enum HeightMeasurements {
  INCHES = 'inches',
  CENTIMETERS = 'centimeters',
}

enum WeightMeasurements {
  KILOGRAM = 'kilogram',
}

class HeightObject {
  @IsNotEmpty()
  number: number;

  @IsEnum(HeightMeasurements)
  measurements: HeightMeasurements;
}

class WeightObject {
  @IsNotEmpty()
  number: number;

  @IsEnum(WeightMeasurements)
  measurements: WeightMeasurements;
}

export class CreateProfileDto {
  @IsNotEmpty()
  user: User;

  @IsString()
  name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  date_of_birth: Date;

  @ValidateNested()
  @Type(() => HeightObject)
  height: HeightObject;

  @ValidateNested()
  @Type(() => WeightObject)
  weight: WeightObject;

  @IsString()
  image: string;

  @IsString()
  horoscope: string;

  @IsString()
  zodiac: string;

  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  interest: string[];
}
