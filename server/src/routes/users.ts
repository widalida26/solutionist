import express from 'express';
import signup from '../controllers/users/signup';
import login from '../controllers/users/login';
import { blockUnauthorized } from '../middleware/checkauth';
import signout from '../controllers/users/signout';
import google from '../controllers/users/google';

const userRouter = express.Router();
userRouter.delete('/signout', blockUnauthorized, signout);
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/google', google);

export default userRouter;
