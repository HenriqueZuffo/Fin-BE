import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param, Patch,
  Post
} from "@nestjs/common";
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AppUtils } from '../app.utils';
import { UpdateAccountDto } from "./dto/update-account.dto";

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

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return this.accountService.delete(id);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }

  @Patch()
  async update(@Body() accountDTO: UpdateAccountDto){
    try{
      return this.accountService.update(accountDTO);
    }catch(err){
      AppUtils.trataExceptions(err);
    }
  }
}
