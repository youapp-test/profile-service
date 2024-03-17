import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  access_token_hash: string;

  @IsNotEmpty()
  @IsNumber()
  exp: number;
}
