import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AppUtils } from '../app.utils';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginUserDto) {
    try {
      return this.authService.signIn(loginDTO.email, loginDTO.password);
    } catch (err) {
      AppUtils.trataExceptions(err);
    }
  }
}
