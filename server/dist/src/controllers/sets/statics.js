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
const status_1 = require("../../service/status");
const errorGenerator_1 = __importDefault(require("../../error/errorGenerator"));
const statics = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const recordId = Number(req.params['recordId']);
    // 데이터가 누락되거나 유효하지 않을 경우
    if (!recordId) {
        errorGenerator_1.default({ statusCode: 400 });
    }
    // solveStatus 테이블 이용을 위한 statusService 인스턴스
    const statusServiceInstance = typedi_1.default.get(status_1.StatusService);
    // 유저들의 선택지 반환
    const userChoices = yield statusServiceInstance.getUserChoices(recordId);
    // solveRecords 테이블 이용을 위한 solveRecords 인스턴스
    const recordsServiceInstance = typedi_1.default.get(records_1.RecordsService);
    // 해당 세트의 전체 정답률 집계
    const totalRate = yield recordsServiceInstance.getTotalAnswerRate(recordId);
    res.status(200).json({
        totalRate,
        userChoices,
    });
});
exports.default = statics;
//# sourceMappingURL=statics.js.map