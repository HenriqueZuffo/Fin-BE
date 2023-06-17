import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(account: CreateAccountDto) {
    return await this.accountRepository.create(account);
  }

  async login(id: number) {
    return await this.accountRepository.login(id);
  }

  async delete(id: number) {
    return await this.accountRepository.delete(id);
  }
}
