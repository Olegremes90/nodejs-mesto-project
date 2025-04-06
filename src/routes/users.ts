import express from 'express';
import { getUsers, createUser, getUserById, updateUser, updateUserAvatar } from '../controllers/users';
const router = express.Router();
router.get('/', getUsers);
router.get('/:id', getUserById);
// сработает при POST-запросе на URL /films
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
export default router;
