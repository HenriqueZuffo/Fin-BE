import { AccountRepository } from '../account.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateAccountDto } from '../../dto/update-account.dto';
import { CreateAccountDto } from '../../dto/create-account.dto';
import { AccountEntity } from '../../entities/account.entity';

@Injectable()
export class PostgresAccountRepository extends AccountRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(account: CreateAccountDto): Promise<AccountEntity> {
    return this.prisma.account.create({
      data: account,
    });
  }

  async delete(accountId: number): Promise<void> {
    this.prisma.account.delete({
      where: {
        id: accountId,
      },
    });

    return;
  }

  async login(accountId: number): Promise<number> {
    //TODO: refatorar para receber usuário e senha e retornar o id, fazer isso apos implementação do jwt ou algum auth da vida ai
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId,
      },
    });

    return account?.id > 0 ? account.id : 0;
  }

  async update(account: UpdateAccountDto): Promise<void> {
    return Promise.resolve(undefined);
  }
}
