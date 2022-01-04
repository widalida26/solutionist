"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const problems_1 = require("../entity/problems");
const problems_2 = require("../../../dummy/problems");
class CreateInitialUserData {
    run(factory, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection
                .createQueryBuilder()
                .insert()
                .into(problems_1.problems)
                .values(problems_2.dummyProblems)
                .execute();
        });
    }
}
exports.CreateInitialUserData = CreateInitialUserData;
//# sourceMappingURL=03-create-problems.js.map