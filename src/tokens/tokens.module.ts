import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('PRIVATE_KEY'),
        signOptions: {
          expiresIn: config.get<string>('EXPIRES_TIME'),
        },
      })
    }),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
