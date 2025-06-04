import {NextFunction, Request, Response} from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import FoundExistEmailError from '../errors/sign-exist-email-err';
import NotFoundError from '../errors/not-found-err';
import IncorrectData from '../errors/incorrect-data';
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

config();
export const { JWT_SECRET = 'JWT_SECRET' } = process.env;

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch (error) {
    next(error);
  }
};
export const createUser = async (req: Request, res: Response,  next: NextFunction):Promise<any> => {
  try {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        return User.create({name: req.body.name , about: req.body.about, avatar: req.body.avatar, email: req.body.email, password: hash })
          .then((user) => {
            const { password, ...userWithoutPassword } = user.toObject();
            res.status(201).send({ data: userWithoutPassword })
          })
          .catch(err => {
            if (err instanceof Error && err.message.includes('E11000')) {
              throw new FoundExistEmailError('Пользователь с таким email уже существует')
            } else {
              next(err)
            }
          });
      })
      .catch(next)
  }catch(error) {
    next(error)
  }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).json(user);
  } catch (err) {
    next(err)
  }
};
export const updateUser = async (req: Request, res: Response, next:NextFunction):Promise<any> => {
  let userId = '';
  try {
    if (req.user) {
      userId = req.user._id;
    }
    const updates = req.body;
    const updatedUser  = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser ) {
      throw new NotFoundError('Не найден пользователь для обновления');
    }
    res.send(updatedUser );
  } catch (err) {
    next(err);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next:NextFunction):Promise<any> => {
  let userId = '';
  try {
    if (req.user) {
      userId = req.user._id;
    }
    const { avatar } = req.body;
    if (!avatar) {
      throw new IncorrectData('В запросе переданы некорректные данные')
    }
    const updatedUser  = await User.findByIdAndUpdate(userId, { avatar }, { new: true });
    if (!updatedUser ) {
      throw new NotFoundError('Не найден пользователь для обновления')
    }
    res.send(updatedUser);

  } catch (err) {
    next(err)
  }
};

// controllers/users.ts

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  console.log(req.body);
  return User.findUserByCredentials(email, password)
    .then((user) => {


      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });


      res.send({ token });
    })
    .catch((err) => {
     next(err)

    });
};

export const getInfoCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).json(user);
  } catch (err) {
    next(err)
  }
};
