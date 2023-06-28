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

  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.prisma.users.create({
      data: user,
    });
  }

  async delete(userId: number): Promise<void> {
    await this.prisma.users.delete({
      where: {
        id: userId,
      },
    });

    return;
  }

  async update(user: UpdateUserDto): Promise<void> {
    await this.prisma.users.update({
      data: user,
      where: {
        id: user.id,
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

  getByEmail(email: string): Promise<UserEntity> {
    return this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
  }
}
