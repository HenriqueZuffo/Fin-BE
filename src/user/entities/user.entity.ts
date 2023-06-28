import { Users } from '@prisma/client';

export class UserEntity implements Users {
  id: number;
  name: string;
  email: string;
  password: string;
  updated_at: Date;
  created_at: Date;
}
