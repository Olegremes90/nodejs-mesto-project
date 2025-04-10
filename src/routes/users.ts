import express from 'express';
import  { getUsers, getUserById, updateUser, updateUserAvatar, getInfoCurrentUser } from '../controllers/users';
import {celebrate} from 'celebrate';
import {validateUpdateUser, validateUpdateUserAvatar} from "../validation/validation";

const router = express.Router();
router.get('/', getUsers);
router.get('/me', getInfoCurrentUser)
router.patch('/me',  celebrate(validateUpdateUser ),updateUser);
router.patch('/me/avatar',celebrate(validateUpdateUserAvatar ), updateUserAvatar);
router.get('/:id', getUserById)
export default router;