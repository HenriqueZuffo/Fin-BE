import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly accountRepository: UserRepository) {}

  async create(account: CreateUserDto) {
    return await this.accountRepository.create(account);
  }

  async delete(id: number) {
    const account = await this.accountRepository.getById(id);
    if (!account) {
      throw new HttpException('Conta inexistente', HttpStatus.BAD_REQUEST);
    }

    return await this.accountRepository.delete(id);
  }

  async update(account: UpdateUserDto) {
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
