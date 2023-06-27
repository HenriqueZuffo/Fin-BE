import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class PostgresUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(account: CreateUserDto): Promise<UserEntity> {
    return this.prisma.users.create({
      data: account,
    });
  }

  async delete(accountId: number): Promise<void> {
    await this.prisma.users.delete({
      where: {
        id: accountId,
      },
    });

    return;
  }

  async update(account: UpdateUserDto): Promise<void> {
    await this.prisma.users.update({
      data: account,
      where: {
        id: account.id,
      },
    });

    return;
  }

  async getById(id: number): Promise<UserEntity> {
    return this.prisma.users.findFirst({
      where: {
        id: id,
      },
    });
  }
}
