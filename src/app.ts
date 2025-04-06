// app.ts — входной файл
import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
const app = express();
/*
по какой то причине не видит расширение интерфейса Request из файла @types/express.d.ts
крутил по разному, но так и не получилось, в итоге оставил его здесь(
 */
interface CustomError extends Error {
  statusCode?: number; // Статус ошибки
  message: string; // Сообщение об ошибке
}
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// подключаемся к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '67f1022cc3d81bc22f9ea219' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((err:CustomError, req: Request, res: Response) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});
// подключаем мидлвары, роуты и всё остальное...

app.listen(3000);