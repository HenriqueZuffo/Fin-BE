import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaService } from '../prisma/prisma.service';
import { AccountRepository } from './repositories/account.repository';
import { PostgresAccountRepository } from './repositories/implementation/postgres-account.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    PrismaService,
    {
      provide: AccountRepository,
      useClass: PostgresAccountRepository,
    },
  ],
})
export class AccountModule {}
