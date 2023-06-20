import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsNotEmpty } from 'class-validator';
import { AppUtils } from '../../app.utils';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsNotEmpty({ message: AppUtils.requiredMessage('id') })
  id: number;
}
