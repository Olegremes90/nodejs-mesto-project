import express from 'express';
import  { getCard, createCard, deleteCard, likeCard, dislikeCard} from '../controllers/cards';
import {celebrate} from "celebrate";
import {validateCreateCard, validateReqId} from "../validation/validation";

const router = express.Router();
router.get('/', getCard);
router.post('/',  celebrate(validateCreateCard ), createCard);
router.delete('/:id', celebrate(validateReqId ), deleteCard);
router.put('/:id/likes', celebrate(validateReqId ), likeCard)
router.delete('/:id/likes', celebrate(validateReqId ), dislikeCard)
export default router;
