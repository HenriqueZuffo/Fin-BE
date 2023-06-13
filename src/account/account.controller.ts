import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() account: CreateAccountDto, res: Response) {
    try {
      return this.accountService.create(account);
    } catch (err) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err.message());
    }
  }
}
