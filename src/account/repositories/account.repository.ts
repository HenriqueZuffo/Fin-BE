import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

export interface AccountRepository {
  create(account: CreateAccountDto): Promise<string>;
  update(account: UpdateAccountDto): Promise<void>;
  delete(id: number): Promise<void>;
  login(id: number): Promise<boolean>;
}
