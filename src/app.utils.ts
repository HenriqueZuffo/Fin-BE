import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export abstract class AppUtils {
  public static trataExceptions(err) {
    console.log(err.message);
    console.log(err.stack);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new HttpException(
          `Campo ${err.meta.target[0]} já existe!`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public static requiredMessage(field: string): string {
    return `${field} é de preenchimento obrigatório!`;
  }

  public static async crypt(str: string): Promise<string> {
    console.log(`${!str} && ${str}`);
    if (!str) return;
    const salt = Number(process.env.SALT);

    return bcrypt.hash(str, salt);
  }
}
