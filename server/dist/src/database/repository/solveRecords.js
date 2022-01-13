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
const solveRecords_1 = require("../entity/solveRecords");
const custom_1 = require("../../utils/custom");
let SolveRecordsRepository = class SolveRecordsRepository extends typeorm_1.Repository {
    // 세트를 푼 사람들의 수 반환
    getSolvedCount(setId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('records')
                .select('COUNT(*)', 'cnt')
                .where(`records.setId = ${setId}`)
                .andWhere('averageRate >: average')
                .getRawMany()
                .then((result) => custom_1.convertRawObject(result)[0]['avg']);
        });
    }
    // 세트 정답률 평균 반환
    getAvgRate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('records')
                .select('AVG(records.answerRate)', 'avg')
                .where(`records.id = ${id}`)
                .getRawMany()
                .then((result) => custom_1.convertRawObject(result)[0]['avg']);
        });
    }
};
SolveRecordsRepository = __decorate([
    typeorm_1.EntityRepository(solveRecords_1.solveRecords)
], SolveRecordsRepository);
exports.SolveRecordsRepository = SolveRecordsRepository;
//# sourceMappingURL=solveRecords.js.map