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
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const solveRecords_1 = require("../database/repository/solveRecords");
const sets_1 = require("../database/repository/sets");
let RecordsService = class RecordsService {
    constructor(recordRepo, setsRepo) {
        this.recordRepo = recordRepo;
        this.setsRepo = setsRepo;
    }
    makeRecord(setId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 해당하는 세트가 없는 경우
            yield this.setsRepo.findOne(setId).then((result) => {
                if (!result) {
                    errorGenerator_1.default({ statusCode: 400 });
                }
            });
            // solveRecords 테이블에 삽입
            const recordId = yield this.recordRepo
                .save({ setId, userId })
                .then((result) => (result ? result.id : null));
            // solvedRecords 삽입에 실패한 경우
            if (!recordId) {
                errorGenerator_1.default({ statusCode: 500 });
            }
            return recordId;
        });
    }
    submitRecord(recordId, answerRate) {
        return __awaiter(this, void 0, void 0, function* () {
            // answerRate가 유효하지 않을 경우
            if (answerRate < 0 || answerRate > 100) {
                errorGenerator_1.default({ statusCode: 400 });
            }
            // id에 해당하는 레코드 있는지 확인
            yield this.recordRepo.save({ id: recordId, answerRate: answerRate });
            return recordId;
        });
    }
    // 해당 세트를 푼 유저를 카운트
    countRecord(setId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordRepo.count({
                where: {
                    setId,
                    answerRate: typeorm_1.MoreThan(-1),
                },
            });
        });
    }
    getTotalAnswerRate(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordRepo.getAvgAnswerRate(recordId);
        });
    }
};
RecordsService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __param(1, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [solveRecords_1.SolveRecordsRepository,
        sets_1.SetsRepository])
], RecordsService);
exports.RecordsService = RecordsService;
//# sourceMappingURL=records.js.map