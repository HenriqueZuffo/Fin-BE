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
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AppUtils } from '../app.utils';
import { UpdateAccountDto } from './dto/update-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() account: CreateAccountDto) {
    try {
      account.password = await AppUtils.crypt(account.password);

      await this.accountService.create(account);
      return;
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginAccount: LoginAccountDto) {
    try {
      return this.accountService.login(loginAccount);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return this.accountService.delete(id);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }

  @Patch()
  async update(@Body() accountDTO: UpdateAccountDto) {
    try {
      if (accountDTO?.password) {
        accountDTO.password = await AppUtils.crypt(accountDTO.password);
      }

      return this.accountService.update(accountDTO);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }
}
