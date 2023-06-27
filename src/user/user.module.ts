import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { PostgresUserRepository } from './repositories/implementation/postgres-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PostgresUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
