import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAccountDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
