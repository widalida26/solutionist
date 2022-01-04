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
const add = (req, res) => __awaiter(this, void 0, void 0, function* () {
    //console.log(req.body);
    console.log(typeof req.body['choices']);
    const set = { title: req.body['title'], description: req.body['description'] };
    const problems = req.body['problems'];
    const choices = req.body['choices'];
    console.log('set', set);
    console.log('problems', problems[0].index);
    console.log('choices', choices);
    res.send();
});
exports.default = add;
//# sourceMappingURL=add.js.map