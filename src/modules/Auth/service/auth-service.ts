import jwt from 'jsonwebtoken';
import { prismaConnect } from 'prismaConn';
import bcrypt from 'bcrypt';

// Enum
import { EStatusErrors } from 'enum/status-errors.enum';

// Utils
import { UtilsTokenAuth } from 'modules/User/utils/token-utils';

class AuthService {
  public async login(email: string, password: string) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!findUser) {
      throw new Error(EStatusErrors.E404);
    }

    if (!bcrypt.compareSync(password, findUser.password)) {
      throw new Error(EStatusErrors.E401);
    }

    return UtilsTokenAuth.jwtGenerete(findUser);
  }
  public async token(refreshToken: string) {
    try {
      await jwt.verify(refreshToken, `${process.env.JWT_REFRESH_TOKEN_SECRET}`);
    } catch (error) {
      throw new Error(EStatusErrors.E401);
    }

    const decode = await (
      jwt.decode(refreshToken) as { payload: { id: string } }
    ).payload;

    const findUser = await prismaConnect.user.findUnique({
      where: {
        id: decode.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!findUser) {
      throw new Error(EStatusErrors.E404);
    }

    return UtilsTokenAuth.jwtGenerete(findUser);
  }
}

export const authService = new AuthService();
