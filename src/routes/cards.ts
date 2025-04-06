import express, {Request, Response} from 'express';
import Card from '../models/user';
import  { getCard, createCard, deleteCard, likeCard, dislikeCard} from '../controllers/cards';
const router = express.Router();
router.get('/', getCard);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard)
router.delete('/:id/likes', dislikeCard)
export default router;

//67f1022cc3d81bc22f9ea218