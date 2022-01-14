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
const submit = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const recordId = Number(req.params['recordId']);
    const answerRate = req.body['answerRate'];
    // 데이터가 누락되거나 유효하지 않을 경우
    if (!recordId || answerRate == null) {
        errorGenerator_1.default({ statusCode: 400 });
    }
    // 정답률을 집계할 수 없는 경우 => 모든 문제가 설문
    if (answerRate === -1) {
        res.status(204).json({ recordId });
    }
    // solveRecords 테이블 이용을 위한 recordsService 인스턴스
    const recordsServiceInstance = typedi_1.default.get(records_1.RecordsService);
    // 전체 정답률 집계
    const submmitedId = yield recordsServiceInstance.submitRecord(recordId, answerRate);
    res.status(201).json({
        id: submmitedId,
    });
});
exports.default = submit;
//# sourceMappingURL=submit.js.map