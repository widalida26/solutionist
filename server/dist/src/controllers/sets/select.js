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
const records_1 = require("../../service/records");
const errorGenerator_1 = __importDefault(require("../../error/errorGenerator"));
const select = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('선택');
    const setId = Number(req.params['setId']);
    // setId가 유효하지 않을 경우
    if (!setId) {
        errorGenerator_1.default({ statusCode: 400 });
    }
    // sets 테이블 이용을 위한 setService 인스턴스
    const setServiceInstance = typedi_1.default.get(sets_1.SetService);
    // 세트 선택
    const selectedSet = yield setServiceInstance.selectSet(Number(setId));
    // solveRecords 테이블 이용을 위한 recordsService 인스턴스
    const recordsServiceInstance = typedi_1.default.get(records_1.RecordsService);
    const solvedUserNumber = yield recordsServiceInstance.countRecord(setId);
    res.status(200).json(Object.assign({ solvedUserNumber }, selectedSet));
});
exports.default = select;
//# sourceMappingURL=select.js.map