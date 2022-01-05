import express from 'express';
import add from '../controllers/sets/add';
import asyncfy from 'express-asyncify';
import search from 'src/controllers/sets/search';

const setsRouter = asyncfy(express.Router());

// 세트 검색
setsRouter.get('/sets', search);
// 세트 제작
setsRouter.post('/choices', add);

export default setsRouter;
