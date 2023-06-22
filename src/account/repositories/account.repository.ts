import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
import { LoginAccountDto } from '../dto/login-account.dto';

@Injectable()
export abstract class AccountRepository {
  abstract create(account: CreateAccountDto): Promise<AccountEntity>;

  abstract update(account: UpdateAccountDto): Promise<void>;

  abstract delete(accountId: number): Promise<void>;

  abstract login(loginAccountDto: LoginAccountDto): Promise<AccountEntity>;

  abstract getById(id: number): Promise<AccountEntity>;
}
