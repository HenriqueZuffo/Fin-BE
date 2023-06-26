import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(id: number, password: string) {
    const account = await this.accountService.getById(id).then((acc) => {
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
