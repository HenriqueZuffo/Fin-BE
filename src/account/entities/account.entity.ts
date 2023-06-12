import { Account } from '@prisma/client';

export class AccountEntity implements Account {
  id: number;
  name: string;
  email: string;
  password: string;
  updated_at: Date;
  created_at: Date;
}
