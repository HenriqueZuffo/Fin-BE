import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

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
}
