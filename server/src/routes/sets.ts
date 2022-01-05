import express from 'express';
import add from '../controllers/sets/add';
import asyncfy from 'express-asyncify';
import search from '../controllers/sets/search';
import checktoken from '../middleware/checkauth';

const setsRouter = asyncfy(express.Router());

setsRouter.get('/sets', search); // 세트 검색
setsRouter.post('/choices', checktoken, add); // 세트 제작

export default setsRouter;
