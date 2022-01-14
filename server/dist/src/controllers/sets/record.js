"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const records_1 = require("../../service/records");
const errorGenerator_1 = __importDefault(require("../../error/errorGenerator"));
const uuid_1 = require("uuid");
const record = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const userInfo = res.locals.userInfo;
    const userId = userInfo ? userInfo.id : null;
    // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
    const solver = userInfo ? userInfo.email : uuid_1.v4();
    const setId = req.body['setId'];
    // 데이터가 누락됐을 경우
    if (!setId) {
        errorGenerator_1.default({ statusCode: 400 });
    }
    // sets 테이블 이용을 위한 setService 인스턴스
    const recordsServiceInstance = typedi_1.default.get(records_1.RecordsService);
    // 세트 선택
    const recordId = yield recordsServiceInstance.makeRecord(setId, userId);
    res.status(201).json({
        solver,
        recordId,
    });
});
exports.default = record;
//# sourceMappingURL=record.js.map