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
const sets_1 = require("../database/repository/sets");
const problems_1 = require("../database/repository/problems");
const choices_1 = require("../database/repository/choices");
const collections_1 = require("../database/repository/collections");
const custom_1 = require("../utils/custom");
let SetService = class SetService {
    constructor(setsRepo, problemsRepo, choicesRepo, collectionRepo) {
        this.setsRepo = setsRepo;
        this.problemsRepo = problemsRepo;
        this.choicesRepo = choicesRepo;
        this.collectionRepo = collectionRepo;
    }
    // 타이틀로 세트 검색
    findSet(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundSets = yield this.setsRepo.findSetsByTitle(title);
            return {};
        });
    }
    selectSet(setId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 세트 검색
            const set = yield this.setsRepo.findSet(setId);
            // 세트 검색에 실패하가나 유효하지 않은 경우
            if (!set || !set['collection']) {
                errorGenerator_1.default({ statusCode: 500 });
            }
            return {
                setId: setId,
                collectionId: set.collectionId,
                creator: set['collection'].creator ? set['collection'].creator.username : null,
                title: set.title,
                description: set.description,
                createdAt: custom_1.timestampToLocaleTime(String(set['collection'].createdAt)),
                problems: set.problem,
            };
        });
    }
    // 세트 생성 => collection 테이블에 추가
    createSet(set, creatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            // collection 생성
            set.collectionId = yield this.collectionRepo
                .save({ id: null, creatorId })
                .then((collection) => collection.id);
            // collection 생성이 실패했을 경우
            if (!set.collectionId) {
                errorGenerator_1.default({ statusCode: 500 });
            }
            // 세트 제작
            const madeSet = yield this.makeSet(set);
            // 생성 정보 세팅
            return {
                title: madeSet.title,
                createdAt: custom_1.timestampToLocaleTime(madeSet.createdAt),
            };
        });
    }
    // 세트 수정 => sets 테이블에만 추가
    modifySet(set) {
        return __awaiter(this, void 0, void 0, function* () {
            // collection의 생성 일자 검색
            const collectionCreatedAt = yield this.setsRepo.findCollectionCreatedAt(set.collectionId);
            // collection이 없거나 collection에 해당하는 set가 없을 경우
            if (!collectionCreatedAt) {
                errorGenerator_1.default({ statusCode: 400 });
            }
            // 세트 제작
            const madeSet = yield this.makeSet(set);
            // 수정 정보 세팅
            return {
                title: madeSet.title,
                createdAt: custom_1.timestampToLocaleTime(collectionCreatedAt),
                upatedAt: custom_1.timestampToLocaleTime(madeSet.createdAt),
            };
        });
    }
    // 세트 삽입
    makeSet(set) {
        return __awaiter(this, void 0, void 0, function* () {
            // 세트 타이틀이 누락된 경우
            if (!set.title) {
                errorGenerator_1.default({ statusCode: 400 });
            }
            // 세트 삽입 후 setId 값 저장
            const savedSet = yield this.setsRepo.save(Object.assign({}, set));
            // 세트가 저장되지 않았을 때
            if (!savedSet) {
                errorGenerator_1.default({ statusCode: 500 });
            }
            const problems = set['problems'];
            // 문제가 배열 형태일 경우에만 저장
            // 문제 없는 세트가 존재하기 때문에 문제 데이터가 없을 경우에도 별도의 에러 없음
            if (Array.isArray(problems)) {
                // 문제 배열에 setId 값 삽입
                const problemsToSave = problems.map((problem) => {
                    // 문제의 index나 question 값이 존재하지 않으면 에러
                    if (!problem.index || !problem.question) {
                        errorGenerator_1.default({ statusCode: 400 });
                    }
                    // db에 적합한 형태로 problems 변환 => setId 삽입
                    return custom_1.insertIntoObject(problem, 'setId', savedSet.id);
                });
                // 문제 삽입
                const savedProblems = yield this.problemsRepo.save(problemsToSave);
                var choicesToSave = []; // db에 삽입될 형태의 보기 배열
                // 보기 배열에 problemId 값 삽입
                savedProblems.forEach((problem) => {
                    const choices = problem['choice'];
                    // 보기가 배열 형태일 경우에만 저장
                    if (Array.isArray(choices)) {
                        // 문제 배열에 setId 값 삽입 후 모든 보기의 배열을 하나로 병합
                        choicesToSave = choicesToSave.concat(choices.map((choice) => {
                            // 보기의 index 값이 존재하지 않으면 에러
                            if (!choice.index) {
                                errorGenerator_1.default({ statusCode: 400 });
                            }
                            // choices에 problemId 삽입
                            return custom_1.insertIntoObject(choice, 'problemId', problem.id);
                        }));
                    }
                });
                // 보기가 2개 미만인 경우
                if (choicesToSave.length < 2) {
                    errorGenerator_1.default({ statusCode: 400 });
                }
                // 보기 삽입
                yield this.choicesRepo.save(choicesToSave);
            }
            return savedSet;
        });
    }
};
SetService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __param(1, typeorm_typedi_extensions_1.InjectRepository()),
    __param(2, typeorm_typedi_extensions_1.InjectRepository()),
    __param(3, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [sets_1.SetsRepository,
        problems_1.ProblemsRepository,
        choices_1.ChoicesRepository,
        collections_1.CollectionsRepository])
], SetService);
exports.SetService = SetService;
//# sourceMappingURL=sets.js.map