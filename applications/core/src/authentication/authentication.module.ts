import { Module } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'
import { LocalStrategy } from './local.strategy'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`
        }
      })
    })
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
