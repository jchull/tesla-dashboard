import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AccountModule } from '../account/account.module'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    AccountModule,
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (args) => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.TOKEN_TTL
        }
      })
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
