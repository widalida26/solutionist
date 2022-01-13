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
const sets_1 = require("../../service/sets");
const errorGenerator_1 = __importDefault(require("../../error/errorGenerator"));
const custom_1 = require("../../utils/custom");
const create = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
    const userInfo = res.locals.userInfo
        ? res.locals.userInfo
        : { id: null, username: null };
    const setDTO = req.body;
    // 데이터가 누락됐을 경우
    if (custom_1.CheckEmptyObject(setDTO)) {
        errorGenerator_1.default({ statusCode: 400 });
    }
    // 세트 id가 있을 경우 => 중복 생성 방지
    if (setDTO.id) {
        errorGenerator_1.default({ statusCode: 409 });
    }
    // sets 테이블 이용을 위한 setService 인스턴스
    const setsServiceInstance = typedi_1.default.get(sets_1.SetService);
    // 세트 작성 정보 세팅
    setDTO.editorId = null;
    // 세트 생성
    const setInfo = yield setsServiceInstance.createSet(setDTO, userInfo.id);
    res.status(201).json(Object.assign({ username: userInfo.username }, setInfo));
});
exports.default = create;
//# sourceMappingURL=create.js.map