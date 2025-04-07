// @types/express.d.ts
import * as express from 'express';

interface CustomError extends Error {
  statusCode?: number; 
  message: string;
}
declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
      };
    }
  }
}