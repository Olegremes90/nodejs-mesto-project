
import express, {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import {login, createUser} from './controllers/users';
import  auth  from './middlewares/auth';
import { errorLogger, requestLogger }  from './middlewares/logger';
import {validateSignUp, validateLogin} from './validation/validation';
import NotFoundError from './errors/not-found-err';
import {celebrate, errors} from "celebrate";
const app = express();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');


app.use(requestLogger)

app.post('/signin', celebrate(validateLogin ), login);
app.post('/signup', celebrate(validateSignUp ), createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req: Request, res: Response, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errors());
app.use(errorLogger);
app.use((err:CustomError, req: Request, res: Response, next:NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({

      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});


app.listen(3000);