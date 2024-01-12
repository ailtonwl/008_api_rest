import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Enum
import { EZod } from 'enum/zod.enum';
import { EStatusErrors } from 'enum/status-errors.enum';
import jwt from 'jsonwebtoken';

export class MiddlewareAuth {
  public static async authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers['authorization'] || '';

    try {
      const ZAuthSchema = z
        .string()
        .min(25, { message: `Token ${EZod.REQUIRED}` });

      ZAuthSchema.parse(token);
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        erros: err.erros,
      });
    }

    try {
      await jwt.verify(token, `${process.env.JWT_SECRET}`);
    } catch (error) {
      return res.status(401).json({
        error: EStatusErrors.E401,
      });
    }

    const paramsId = req.params.id;
    const decoded = ((await jwt.decode(token)) as { payload: { id: string } })
      .payload;

    if (paramsId && paramsId !== decoded.id) {
      return res.status(400).json({
        message: EStatusErrors.E400,
      });
    }

    next();
  }
}
