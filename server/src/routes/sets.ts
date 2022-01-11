import express from 'express';
import { search, select, create, modify, solve, submit } from '../controllers/sets/index';
import asyncfy from 'express-asyncify';
import { saveUserInfo, blockUnauthorized } from '../middleware/checkauth';

const setsRouter = asyncfy(express.Router());

setsRouter.get('/sets', search); // 세트 검색
setsRouter.get('/sets/:setId', select); // 세트 선택
setsRouter.post('/collections', saveUserInfo, create); // 세트 제작
setsRouter.post('/sets', blockUnauthorized, modify); // 세트 수정
setsRouter.post('/solveSets', saveUserInfo, solve); // 문제 풀기
setsRouter.post('/solvedSets', saveUserInfo, submit); // 세트 제출

export default setsRouter;
