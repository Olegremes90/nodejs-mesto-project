import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import NotFoundError from '../errors/not-found-err';
import IncorrectData from '../errors/incorrect-data';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch (error) {
    next(error);
  }
};
export const createUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  const { name, about, avatar } = req.body;
  try {
    if (!name || name.length < 2 || name.length > 30) {
      throw new IncorrectData('Некорректные данные в поле name');
    }
    if (!about || about.length < 2 || about.length > 200) {
      throw new IncorrectData('Некорректные данные в поле about');
    }
    if (!avatar) {
      throw new IncorrectData('Некорректные данные в поле avatar');
    }

    return User.create({ name, about, avatar })
      .then((user) => res.status(201).send({ data: user }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};
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
    if(updates.name.length < 2 ||  updates.name.length > 30) {
      throw new IncorrectData('Некорректные данные в поле name');
    }
    if (updates.about.length < 2 ||  updates.about.length > 200) {
      throw new IncorrectData('Некорректные данные в поле about');
    }
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