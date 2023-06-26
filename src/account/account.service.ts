import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './repositories/account.repository';
import { UpdateAccountDto } from './dto/update-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(account: CreateAccountDto) {
    return await this.accountRepository.create(account);
  }

  async login(loginAccountDto: LoginAccountDto) {
    const _account = await this.accountRepository.login(loginAccountDto);

    if (!_account) {
      throw new HttpException('Login inválido!', HttpStatus.UNAUTHORIZED);
    }

    const isSamePassword = await bcrypt.compare(
      loginAccountDto.password,
      _account.password,
    );

    if (!isSamePassword) {
      throw new HttpException('Login inválido!', HttpStatus.UNAUTHORIZED);
    }

    return;
  }

  async delete(id: number) {
    const account = await this.accountRepository.getById(id);
    if (!account) {
      throw new HttpException('Conta inexistente', HttpStatus.BAD_REQUEST);
    }

    return await this.accountRepository.delete(id);
  }

  async update(account: UpdateAccountDto) {
    return this.accountRepository.update(account);
  }

  async getById(id: number) {
    const account = await this.accountRepository.getById(id);
    if (!account) {
      throw new HttpException('Conta inexistente', HttpStatus.BAD_REQUEST);
    }

    return account;
  }
}
