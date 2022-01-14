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
let SolveRecordsRepository = class SolveRecordsRepository extends typeorm_1.Repository {
    // 세트 정답률 평균 반환
    getAvgAnswerRate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('records')
                .select('AVG(records.answerRate)', 'totalRate')
                .innerJoin((qb) => qb.select().from(solveRecords_1.solveRecords, 'r').where(`r.id = ${id}`), 'sr', 'sr.setId = records.setId')
                .where(`records.answerRate > -1`)
                .getRawOne()
                .then((result) => result.totalRate);
        });
    }
};
SolveRecordsRepository = __decorate([
    typeorm_1.EntityRepository(solveRecords_1.solveRecords)
], SolveRecordsRepository);
exports.SolveRecordsRepository = SolveRecordsRepository;
//# sourceMappingURL=solveRecords.js.map