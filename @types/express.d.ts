// @types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string; // или другой тип, который вы используете
        // добавьте другие поля, если необходимо
      };
    }
  }
}