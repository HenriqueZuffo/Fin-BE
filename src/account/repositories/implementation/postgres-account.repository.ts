import { AccountRepository } from '../account.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateAccountDto } from '../../dto/update-account.dto';
import { CreateAccountDto } from '../../dto/create-account.dto';
import { AccountEntity } from '../../entities/account.entity';
import { LoginAccountDto } from '../../dto/login-account.dto';

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
    await this.prisma.account.delete({
      where: {
        id: accountId,
      },
    });

    return;
  }

  async login(loginAccountDto: LoginAccountDto): Promise<AccountEntity> {
    //TODO: refatorar para receber usuário e senha e retornar o id, fazer isso apos implementação do jwt ou algum auth da vida ai
    return this.prisma.account.findFirst({
      where: {
        email: loginAccountDto.email,
      },
    });
  }

  async update(account: UpdateAccountDto): Promise<void> {
    await this.prisma.account.update({
      data: account,
      where: {
        id: account.id,
      },
    });

    return;
  }

  async getById(id: number): Promise<AccountEntity> {
    return this.prisma.account.findFirst({
      where: {
        id: id,
      },
    });
  }
}
