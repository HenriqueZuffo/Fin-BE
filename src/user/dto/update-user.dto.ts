import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { AppUtils } from '../../app.utils';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: AppUtils.requiredMessage('id') })
  id: number;
}
