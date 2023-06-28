import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(account: CreateUserDto) {
    return await this.userRepository.create(account);
  }

  async delete(id: number) {
    const userEntity = await this.userRepository.getById(id);
    if (!userEntity) {
      throw new HttpException('Conta inexistente', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.delete(id);
  }

  async update(account: UpdateUserDto) {
    return this.userRepository.update(account);
  }

  async getById(id: number) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new HttpException('Usuário inexistente', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new HttpException('Usuário inválido!', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
