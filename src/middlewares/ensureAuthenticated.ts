import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

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
        throw new Error('JWT Token is missing!');
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
        throw new Error('Invalid JWT Token!');
    }
}
