// middlewares/auth.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';

interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

const auth  = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as CustomJwtPayload;
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Некорректный токен' });
  }

  req.user = payload;

  next();
};

export default auth;