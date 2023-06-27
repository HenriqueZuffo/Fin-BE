import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AppUtils } from '../app.utils';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() account: CreateUserDto) {
    try {
      account.password = await AppUtils.crypt(account.password);
      return this.userService.create(account).then((val) => {
        return val.id;
      });
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return this.userService.delete(id);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }

  @Patch()
  async update(@Body() accountDTO: UpdateUserDto) {
    try {
      if (accountDTO?.password) {
        accountDTO.password = await AppUtils.crypt(accountDTO.password);
      }

      return this.userService.update(accountDTO);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }
}
