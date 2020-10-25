import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authheader = request.headers.authorization;

  if (!authheader) {
    throw new AppError('JWT Token is missing!');
  }

  const [, token] = authheader.split(' ');
  try {
    const isValidToken = verify(token, authConfig.jwt.secret);
    const { sub } = isValidToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token!');
  }
}
