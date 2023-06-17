import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus, Param,
  Post
} from "@nestjs/common";
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AppUtils } from '../app.utils';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() account: CreateAccountDto) {
    try {
      await this.accountService.create(account);
      return;
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }

  @Get(':id')
  async login(@Param('id') id: number) {
    try {
      return this.accountService.login(id);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }
}
