import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  async getTokens(
    jwtPayload: object
  ) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
    };
  }

}
