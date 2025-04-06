import express from 'express';
import  { getCard, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/cards';
const router = express.Router();
router.get('/', getCard);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);
export default router;

