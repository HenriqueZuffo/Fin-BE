import { AccountRepository } from '../account.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateAccountDto } from '../../dto/update-account.dto';
import { CreateAccountDto } from '../../dto/create-account.dto';

@Injectable()
export class PostgresAccountRepository extends AccountRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(account: CreateAccountDto): Promise<void> {
    await this.prisma.account.create({
      data: account,
    });

    return;
  }

  async delete(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  async login(id: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  async update(account: UpdateAccountDto): Promise<void> {
    return Promise.resolve(undefined);
  }
}
