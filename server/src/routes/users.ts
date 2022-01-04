import express from 'express';
import signup from '../controllers/users/signup';
import login from '../controllers/users/login';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);

export default userRouter;
