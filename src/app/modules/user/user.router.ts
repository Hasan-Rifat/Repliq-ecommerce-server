import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/:email', UserController.getSingleUser);
router.put('/:email', UserController.UpdateUser);
router.delete('/:email', UserController.deleteUser);

export const userRouter = router;
