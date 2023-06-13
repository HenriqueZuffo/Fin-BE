import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './repositories/account.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(account: CreateAccountDto) {
    return await this.accountRepository.create(account);
  }
}
