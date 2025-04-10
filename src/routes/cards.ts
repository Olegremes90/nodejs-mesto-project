import express from 'express';
import  { getCard, createCard, deleteCard, likeCard, dislikeCard} from '../controllers/cards';
import {celebrate} from "celebrate";
import {validateCreateCard} from "../validation/validation";

const router = express.Router();
router.get('/', getCard);
router.post('/',  celebrate(validateCreateCard ), createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard)
router.delete('/:id/likes', dislikeCard)
export default router;
