import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsNotEmpty()
  id: number;
}
