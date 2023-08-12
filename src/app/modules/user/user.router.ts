import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:email', userController.getSingle);
router.put('/:email', userController.UpdateUser);
router.delete('/:email', userController.deleteUser);

export const userRouter = router;
