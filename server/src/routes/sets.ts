import express from 'express';
import add from '../controllers/sets/add';

const setsRouter = express.Router();

setsRouter.post('/choices', add);

export default setsRouter;
