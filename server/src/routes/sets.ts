import express from 'express';
import {
  search,
  select,
  record,
  create,
  modify,
  remove,
  solve,
  submit,
  statics,
} from '../controllers/sets/index';
import asyncfy from 'express-asyncify';
import { saveUserInfo, blockUnauthorized } from '../middleware/checkauth';

const setsRouter = asyncfy(express.Router());

setsRouter.post('/collections', saveUserInfo, create); // 세트 제작
setsRouter.post('/sets', blockUnauthorized, modify); // 세트 수정
setsRouter.delete('/collections', blockUnauthorized, remove); // 세트 삭제
setsRouter.get('/sets', search); // 세트 검색
setsRouter.get('/sets/:setId', select); // 세트 선택
setsRouter.post('/solveRecords', saveUserInfo, record); //풀이 기록
setsRouter.post('/solveStatus', solve); // 문제 풀기
setsRouter.patch('/solveRecords/:recordId', submit); // 세트 제출
setsRouter.get('/solveRecords/:recordId', statics); // 세트 통계

export default setsRouter;
