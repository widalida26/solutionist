"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/sets/index");
const express_asyncify_1 = __importDefault(require("express-asyncify"));
const checkauth_1 = require("../middleware/checkauth");
const setsRouter = express_asyncify_1.default(express_1.default.Router());
setsRouter.get('/sets', index_1.search); // 세트 검색
setsRouter.get('/sets/:setId', index_1.select); // 세트 선택
setsRouter.post('/solveRecords', checkauth_1.saveUserInfo, index_1.record); //풀이 기록
setsRouter.post('/collections', checkauth_1.saveUserInfo, index_1.create); // 세트 제작
setsRouter.post('/sets', checkauth_1.blockUnauthorized, index_1.modify); // 세트 수정
setsRouter.post('/solveStatus', checkauth_1.saveUserInfo, index_1.solve); // 문제 풀기
setsRouter.patch('/solveRecords/:recordId', index_1.submit); // 세트 제출
setsRouter.get('/solveRecords/:recordId', index_1.statics); // 세트 제출
exports.default = setsRouter;
//# sourceMappingURL=sets.js.map