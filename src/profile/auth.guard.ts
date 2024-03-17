import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './auth.constants';
import { Request } from 'express';
import axios from 'axios';
import { ProfileService } from './profile.service';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private jwtService: JwtService) {}
  constructor(private readonly profileService: ProfileService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: jwtConstants.secret,
      // });

      const decoded = jwt.decode(token);
      const local_auth = await this.profileService.findAuthUserId(
        decoded['id'],
      );
      let local_validate = false;
      for (let index = 0; index < local_auth.length; index++) {
        const element = local_auth[index];
        const hash = crypto.createHash('md5');
        hash.update(token);
        const access_token_hash = hash.digest('hex');

        if (access_token_hash == element['access_token_hash']) {
          local_validate = true;
          break;
        }
      }

      if (local_validate) {
        const findId = await this.profileService.findId(decoded['id']);
        const payload = findId.user;
        request['user'] = payload;
      } else {
        const valid_auth = await axios.get('http://auth:3000/user', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const payload = valid_auth.data;
        request['user'] = payload;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    let token: string;

    if (
      request.headers.authorization &&
      request.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = request.headers.authorization.split(' ')[1];
    } else if (request.cookies && request.cookies['token']) {
      token = request.cookies['token'];
    } else {
      throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
    }

    return token;
  }
}
