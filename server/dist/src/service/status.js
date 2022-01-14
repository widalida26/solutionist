"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const errorGenerator_1 = __importDefault(require("../error/errorGenerator"));
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const solveStatus_1 = require("../database/repository/solveStatus");
const solveRecords_1 = require("../database/repository/solveRecords");
const choices_1 = require("../database/repository/choices");
const custom_1 = require("../utils/custom");
let StatusService = class StatusService {
    constructor(statusRepo, recordRepo, choicesRepo) {
        this.statusRepo = statusRepo;
        this.recordRepo = recordRepo;
        this.choicesRepo = choicesRepo;
    }
    solveProblem(solveInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // 필요한 정보가 누락된 경우
            if (custom_1.checkEmptyObjectValue(solveInfo)) {
                errorGenerator_1.default({ statusCode: 400 });
            }
            // 삽입할 데이터 검증
            yield this.verifyStatusToSave(solveInfo.recordId, solveInfo.problemId);
            // choice가 유효한지 확인 => 0 이하거나 가장 마지막 index보다 크면 안됨
            const maxIdx = yield this.choicesRepo.getLastChoice(solveInfo.problemId);
            if (solveInfo.choice <= 0 || solveInfo.choice > maxIdx) {
                errorGenerator_1.default({ statusCode: 400 });
            }
            // 풀이 정보 삽입
            const id = yield this.statusRepo
                .save(Object.assign({}, solveInfo))
                .then((result) => result.id);
            // 선택 비율 집계
            const selectionRate = yield this.calcSelectionRate(maxIdx, solveInfo.problemId);
            // 선택 비율 저장
            yield this.choicesRepo.updateSelectionRate(solveInfo.problemId, selectionRate);
            return {
                id,
                selectionRate,
            };
        });
    }
    verifyStatusToSave(recordId, problemId) {
        return __awaiter(this, void 0, void 0, function* () {
            // solveRecords 테이블에 recrodId가 있는지 조회
            yield this.recordRepo.findOne({ id: recordId }).then((result) => {
                // solveRecords 테이블에 recrodId가 해당하는 레코드가 없는 경우
                if (!result) {
                    errorGenerator_1.default({ statusCode: 400 });
                }
            });
            // 같은 recordId와 problemId를 가진 데이터는 삽입할 수 없음
            yield this.statusRepo.checkDuplicate(recordId, problemId).then((result) => {
                if (result) {
                    errorGenerator_1.default({ statusCode: 400 });
                }
            });
        });
    }
    calcSelectionRate(maxIdx, problemId) {
        return __awaiter(this, void 0, void 0, function* () {
            // problemId에 해당하는 solveStatus 레코드 카운트
            const counted = yield this.statusRepo.countByChoice(problemId).then((result) => {
                const cntInfo = { total: 0, info: {} };
                result.forEach((el) => {
                    let map = custom_1.convertRawObject(el);
                    // 문제 번호 : 숫자 형태의 Map으로 변환
                    let cnt = Number(map['cnt']);
                    cntInfo.info[map['choice']] = cnt;
                    cntInfo.total += cnt;
                });
                return cntInfo;
            });
            // 퍼센트 계산
            const selectionRate = [];
            for (let i = 1; i <= maxIdx; i++) {
                let cnt = counted.info[i] ? counted.info[i] : 0;
                selectionRate.push((cnt / counted.total) * 100);
            }
            return selectionRate;
        });
    }
    getUserChoices(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.statusRepo.getSelectionRateByRecord(recordId).then((result) => {
                return result.map((el) => {
                    const selectionRate = el.problem.choice.map((e) => e.selectionRate);
                    return {
                        problemId: el.problemId,
                        choice: el.choice,
                        selectionRate,
                    };
                });
            });
        });
    }
};
StatusService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __param(1, typeorm_typedi_extensions_1.InjectRepository()),
    __param(2, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [solveStatus_1.SolveStatusRepository,
        solveRecords_1.SolveRecordsRepository,
        choices_1.ChoicesRepository])
], StatusService);
exports.StatusService = StatusService;
//# sourceMappingURL=status.js.map