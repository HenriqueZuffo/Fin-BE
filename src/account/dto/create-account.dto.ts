import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AppUtils } from '../../app.utils';
import { Transform } from 'class-transformer';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty({ message: AppUtils.requiredMessage('nome') })
  name: string;

  @IsString()
  @IsNotEmpty({ message: AppUtils.requiredMessage('senha') })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: AppUtils.requiredMessage('email') })
  email: string;
}
