import express from 'express';
import  { getUsers, getUserById, updateUser, updateUserAvatar, getInfoCurrentUser } from '../controllers/users';
const router = express.Router();
router.get('/', getUsers);
router.get('/:id', getUserById)
router.get('/user/me', getInfoCurrentUser)
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

export default router;