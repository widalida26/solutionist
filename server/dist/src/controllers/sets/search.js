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
const search = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const searchWord = req.query['title'];
    // 쿼리 값이 부적합할 경우
    if (!searchWord) {
        errorGenerator_1.default({ statusCode: 400 });
    }
    // sets 테이블 이용을 위한 setService 인스턴스
    const setServiceInstance = typedi_1.default.get(sets_1.SetService);
    yield setServiceInstance.findSet(searchWord.toString());
    res.end();
});
exports.default = search;
//# sourceMappingURL=search.js.map