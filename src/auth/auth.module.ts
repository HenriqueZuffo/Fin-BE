import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
