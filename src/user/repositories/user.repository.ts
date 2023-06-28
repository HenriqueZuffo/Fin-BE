import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { LoginUserDto } from '../../auth/dto/login-user.dto';

@Injectable()
export abstract class UserRepository {
  abstract create(account: CreateUserDto): Promise<UserEntity>;

  abstract update(account: UpdateUserDto): Promise<void>;

  abstract delete(accountId: number): Promise<void>;

  abstract getById(id: number): Promise<UserEntity>;

  abstract getByEmail(email: string): Promise<UserEntity>;
}
