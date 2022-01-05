import express from 'express';
import add from '../controllers/sets/add';
import asyncfy from 'express-asyncify';

const setsRouter = asyncfy(express.Router());

setsRouter.post('/choices', add);

export default setsRouter;
