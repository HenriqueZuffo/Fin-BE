import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(id: number, password: string) {
    const account = await this.userService.getById(id).then((acc) => {
      return acc;
    });

    if (!account) {
      throw new HttpException('Login inválido', HttpStatus.UNAUTHORIZED);
    }

    const isSamePassword = await bcrypt.compare(account.password, password);

    if (!isSamePassword) {
      throw new HttpException('Login inválido', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      account: account.id,
      name: account.name,
      email: account.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
