"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const solveStatus_1 = require("../entity/solveStatus");
const custom_1 = require("../../utils/custom");
let solveStatusRepository = class solveStatusRepository extends typeorm_1.Repository {
    // 보기 선택 카운트
    countByChoice(problemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('status')
                .select('status.choice AS choice')
                .addSelect('COUNT(*) AS cnt')
                .where({ problemId })
                .groupBy('status.choice')
                .getRawMany()
                .then((reuslt) => {
                const cntInfo = { total: 0, info: {} };
                reuslt.forEach((el) => {
                    let map = custom_1.convertRawObject(el);
                    // 문제 번호 : 숫자 형태의 Map으로 변환
                    let cnt = Number(map['cnt']);
                    cntInfo.info[map['choice']] = cnt;
                    cntInfo.total += cnt;
                });
                return cntInfo;
            });
        });
    }
    checkDuplicate(recordId, problemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('status')
                .innerJoinAndSelect('status.record', 'records')
                .where(`records.id = ${recordId}`)
                .andWhere(`status.problemId = ${problemId}`)
                .getCount()
                .then((result) => result > 0);
        });
    }
};
solveStatusRepository = __decorate([
    typeorm_1.EntityRepository(solveStatus_1.solveStatus)
], solveStatusRepository);
exports.solveStatusRepository = solveStatusRepository;
//# sourceMappingURL=solveStatus.js.map