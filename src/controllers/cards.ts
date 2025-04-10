import {Request, Response, NextFunction} from "express";
import Card from "../models/card";
import NotFoundError from '../errors/not-found-err';
import ErrorRights from "../errors/not-enough-rights-err";

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
      };
    }
  }
}

export const getCard = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
  try {
    const cards = await Card.find({});
    return res.send({ data: cards});
  } catch (error) {
    next(error)
  }
};
export const createCard = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
  let owner = '';
  const {name, link} = req.body;
  try {

    if (req.user) {
      owner = req.user._id;
    }
    return Card.create({name, link, owner})
      .then((card) => res.status(201).send({data: card}))
      .catch(next)
  }catch(error){
    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const cardId = req.params.id;
  const userId = req.user._id;
  return Card.findById(cardId)
    .then((card)=> {

      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      if (card.owner.toString() != userId){
        throw new ErrorRights('Нет прав на удаление.');
      }
      return Card.findByIdAndDelete(cardId)
        .then((deleteCard)=> { res.status(200).json(deleteCard)})
        .catch(next);
    }).catch(next);
};
export const likeCard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const cardId = req.params.id;
  const discard = await Card.findById(cardId);
  try {
    if (!discard) {
      throw new NotFoundError('Передан несуществующий _id карточки.')
    }
    return Card.findByIdAndUpdate(
      cardId,
      {$addToSet: {likes: req.user._id}},
      {new: true},
    )
      .then((likedCard) => res.send({data: likedCard}))
      .catch(next)
  }catch(error){
    next(error);
  }
}

export const dislikeCard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const cardId = req.params.id;
  const discard = await Card.findById(cardId);
  try {
    if (!discard) {
      throw new NotFoundError('Передан несуществующий _id карточки.')
    }
    return Card.findByIdAndUpdate(
      cardId,
      {$pull: {likes: req.user._id}},
      {new: true},
    )
      .then((likedCard) => res.send({data: likedCard}))
      .catch(next)
  }catch(error){
    next(error);
  }
}





