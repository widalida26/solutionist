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
const sets_1 = require("../entity/sets");
const users_1 = require("../entity/users");
const custom_1 = require("../../utils/custom");
let SetsRepository = class SetsRepository extends typeorm_1.Repository {
    // title으로 세트 검색
    findSetsByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const dt = yield this.createQueryBuilder('sets')
                .select([
                'sets.id as id',
                'sets.collectionId as collectionId',
                'sets.title as title',
                'sets.description as descriptoin',
                'sets.createdAt as createdAt',
            ])
                .addSelect('users.username as username')
                .leftJoin(users_1.users, 'users', 'sets.creatorId = users.id')
                .getRawMany();
            console.log(dt);
        });
    }
    // setId로 세트 검색
    findSet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('sets')
                .innerJoinAndSelect('sets.collection', 'collections')
                .leftJoinAndSelect('collections.creator', 'users')
                .innerJoinAndSelect('sets.problem', 'problems')
                .innerJoinAndSelect('problems.choice', 'choices')
                .where(`sets.id = ${id}`)
                .getOne();
        });
    }
    // collection의 생성 일자 검색
    findCollectionCreatedAt(collectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('sets')
                .select(['collections.createdAt as createdAt'])
                .innerJoin('sets.collection', 'collections')
                .where('sets.collectionId = :collectionId', { collectionId: collectionId })
                .getRawOne()
                .then((result) => {
                if (!result)
                    return null;
                else
                    return custom_1.convertRawObject(result)['createdAt'];
            });
        });
    }
};
SetsRepository = __decorate([
    typeorm_1.EntityRepository(sets_1.sets)
], SetsRepository);
exports.SetsRepository = SetsRepository;
//# sourceMappingURL=sets.js.map