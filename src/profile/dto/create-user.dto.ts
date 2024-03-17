import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  role: Role;
}
