import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './entities/profile.entity';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const createdProfile = new this.profileModel(createProfileDto);
    const profile = await createdProfile.save();
    return profile;
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const find_profile_user = await this.profileModel.findOne({
      'user._id': id,
    });

    const month = new Date(updateProfileDto.date_of_birth).getMonth() + 1; // January is 0
    const day = new Date(updateProfileDto.date_of_birth).getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      updateProfileDto.horoscope = 'Aries';
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      updateProfileDto.horoscope = 'Taurus';
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      updateProfileDto.horoscope = 'Gemini';
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      updateProfileDto.horoscope = 'Cancer';
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      updateProfileDto.horoscope = 'Leo';
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      updateProfileDto.horoscope = 'Virgo';
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      updateProfileDto.horoscope = 'Libra';
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      updateProfileDto.horoscope = 'Scorpio';
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      updateProfileDto.horoscope = 'Sagittarius';
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      updateProfileDto.horoscope = 'Capricorn';
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      updateProfileDto.horoscope = 'Aquarius';
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      updateProfileDto.horoscope = 'Pisces';
    }

    const year = new Date(updateProfileDto.date_of_birth).getFullYear();
    const animals = [
      'Rat',
      'Ox',
      'Tiger',
      'Rabbit',
      'Dragon',
      'Snake',
      'Horse',
      'Goat',
      'Monkey',
      'Rooster',
      'Dog',
      'Boar',
    ];
    const startYear = 1900;
    const zodiacIndex = (year - startYear) % 12;

    updateProfileDto.zodiac = animals[zodiacIndex];

    const profile = await this.profileModel.findByIdAndUpdate(
      find_profile_user._id,
      { ...updateProfileDto, $inc: { __v: 1 } },
      {
        new: true,
      },
    );
    return profile;
  }

  async findId(id: string): Promise<Profile> {
    const find_profile = await this.profileModel.findOne({
      'user._id': id,
    });
    return find_profile;
  }

  async findUsername(username: string): Promise<Profile> {
    const find_profile = await this.profileModel.findOne({
      'user.username': username,
    });
    return find_profile;
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }

  async createAuth(createAuthDto: CreateAuthDto) {
    const createdAuth = new this.authModel(createAuthDto);
    const auth = await createdAuth.save();
    return auth;
  }

  async findAuthUserId(id: string) {
    const findAuth = this.authModel.find({ user: id });
    return findAuth;
  }
}
