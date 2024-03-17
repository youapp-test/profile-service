import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put()
  @UseGuards(AuthGuard)
  update(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(req.user._id, updateProfileDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req) {
    return this.profileService.findId(req.user._id);
  }

  @Get(':username')
  @UseGuards(AuthGuard)
  findOne(@Param('username') username: string) {
    return this.profileService.findUsername(username);
  }

  @EventPattern('auth_access_token_hash_event')
  handleAccessTokenHash(data: any): void {
    const json_data = JSON.parse(data);
    const createAuthDto: CreateAuthDto = plainToClass(CreateAuthDto, json_data);
    this.profileService.createAuth(createAuthDto);
  }

  @MessagePattern('auth_user_register_queue')
  handleAuthUserRegister(data: any): void {
    const json_data = JSON.parse(data);
    const createUserDto: CreateUserDto = plainToClass(CreateUserDto, json_data);
    const createProfileDto: CreateProfileDto = plainToClass(CreateProfileDto, {
      user: createUserDto,
    });
    this.profileService.create(createProfileDto);
  }

  @MessagePattern('auth_user_update_queue')
  handleAuthUserUpdate(data: any): void {
    const json_data = JSON.parse(data);
    const updateUserDto: UpdateUserDto = plainToClass(UpdateUserDto, json_data);
    const updateProfileDto: UpdateProfileDto = plainToClass(UpdateProfileDto, {
      user: updateUserDto,
    });
    this.profileService.update(
      updateProfileDto.user._id.toString(),
      updateProfileDto,
    );
  }
}
