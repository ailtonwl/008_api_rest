import { prismaConnect } from 'prismaConn';
import { UtilsSendMail } from '../utils/send-mail-utils';
import bcrypt from 'bcrypt';
// Enum
import { EStatusErrors } from 'enum/status-errors.enum';

class ResetPasswordService {
  public async validadeUser(email: string) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        email,
      },
      include: {
        resetPasswordSecret: true,
      },
    });

    if (!findUser) {
      throw new Error(EStatusErrors.E404);
    }

    if (!findUser.resetPasswordSecret) {
      const generateSecret = Number(
        Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join(''),
      );

      const { secret } = await prismaConnect.resetPasswordSecret.create({
        data: {
          secret: generateSecret,
          userId: findUser.id,
        },
        select: {
          secret: true,
        },
      });

      UtilsSendMail.send(email, secret);
      return { email, secret };
    }

    UtilsSendMail.send(email, findUser.resetPasswordSecret.secret);
    return { email, secret: findUser.resetPasswordSecret.secret };
  }

  public async validadeSecurityCode(email: string, secret: number) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        email,
      },
      include: {
        resetPasswordSecret: true,
      },
    });
    if (
      !findUser ||
      !findUser.resetPasswordSecret ||
      findUser.resetPasswordSecret.secret !== secret
    ) {
      throw new Error(EStatusErrors.E404);
    }

    return { email, secret };
  }
  public async resetPassword(
    email: string,
    secret: number,
    newPassword: string,
  ) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        email,
      },
      include: {
        resetPasswordSecret: true,
      },
    });

    if (
      !findUser ||
      !findUser.resetPasswordSecret ||
      findUser.resetPasswordSecret.secret !== secret
    ) {
      throw new Error(EStatusErrors.E404);
    }

    const update = await prismaConnect.user.update({
      where: {
        email,
      },
      data: {
        password: bcrypt.hashSync(newPassword, 6),
      },
      select: {
        name: true,
        email: true,
      },
    });

    await prismaConnect.resetPasswordSecret.delete({
      where: {
        userId: findUser.id,
      },
    });

    return update;
  }
}

export const resetPasswordService = new ResetPasswordService();
