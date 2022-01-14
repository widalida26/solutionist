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
const status_1 = require("../../service/status");
const errorGenerator_1 = __importDefault(require("../../error/errorGenerator"));
const custom_1 = require("../../utils/custom");
const solve = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => 빈 객체 할당
        const solveDTO = req.body;
        // 데이터가 누락됐을 경우
        if (custom_1.checkEmptyObject(solveDTO)) {
            errorGenerator_1.default({ statusCode: 400 });
        }
        // solveStatus 테이블 이용을 위한 solveStatus 인스턴스
        const statusServiceInstance = typedi_1.default.get(status_1.StatusService);
        // 문제 풀이 기록 삽입
        const solveResponse = yield statusServiceInstance.solveProblem(solveDTO);
        res.status(201).json(solveResponse);
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = solve;
//# sourceMappingURL=solve.js.map