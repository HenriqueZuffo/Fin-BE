import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
@Injectable()
export abstract class AccountRepository {
  abstract create(account: CreateAccountDto): Promise<AccountEntity>;
  abstract update(account: UpdateAccountDto): Promise<void>;
  abstract delete(accountId: number): Promise<void>;
  abstract login(accountId: number): Promise<number>;
}
