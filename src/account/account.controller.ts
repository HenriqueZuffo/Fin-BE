import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Prisma } from '@prisma/client';
import { AppUtils } from "../app.utils";

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() account: CreateAccountDto) {
    try {
      return await this.accountService.create(account);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }
}
