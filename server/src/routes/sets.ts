import express from 'express';
import { search, create, modify, solve, last } from '../controllers/sets/index';
import asyncfy from 'express-asyncify';
import { saveUserInfo, blockUnauthorized } from '../middleware/checkauth';

const setsRouter = asyncfy(express.Router());

setsRouter.get('/sets', search); // 세트 검색
setsRouter.post('/collections', saveUserInfo, create); // 세트 제작
setsRouter.post('/sets', blockUnauthorized, modify); // 세트 수정
setsRouter.post('/usersProblems', saveUserInfo, solve); // 문제 풀기
setsRouter.post('/solvedSets', saveUserInfo, last); // 마지막 문제 풀기

export default setsRouter;
