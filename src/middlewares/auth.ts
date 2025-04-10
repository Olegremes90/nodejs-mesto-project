// middlewares/auth.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import AuthorizedError from '../errors/authorized-err';
import { config } from 'dotenv';


declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
      };
    }
  }
}
interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

config();

export const { JWT_SECRET = 'JWT_SECRET' } = process.env;

const auth  = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizedError('Необходима авторизация');
  }


  let payload;

    try {
      payload = jwt.verify(JWT_SECRET, 'some-secret-key') as CustomJwtPayload;
      if (!payload) {
         throw new AuthorizedError('Некорректный токен');
         }
       req.user = payload;
       }catch (error){
         if (error instanceof jwt.JsonWebTokenError) {
           return next(new AuthorizedError('Некорректный токен'));
         }
            }
  } catch (err) {
   next(err);
  }
  next();
};

export default auth;