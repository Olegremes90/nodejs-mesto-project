
import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
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

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '67f27562a02659d36a43659e'
  };

  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((err:CustomError, req: Request, res: Response) => {
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