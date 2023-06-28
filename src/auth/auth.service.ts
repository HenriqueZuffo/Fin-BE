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

  async signIn(email: string, password: string) {
    const user = await this.userService.getByEmail(email).then((acc) => {
      return acc;
    });

    if (!user) {
      throw new HttpException('Login inválido', HttpStatus.UNAUTHORIZED);
    }

    const isSamePassword = await bcrypt.compare(user.password, password);

    if (!isSamePassword) {
      throw new HttpException('Login inválido', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      account: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
