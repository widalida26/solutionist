"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorGenerator_1 = __importDefault(require("../../error/errorGenerator"));
const add = (req, res) => {
    const set = req.body;
    const problems = set['problems'];
    const choices = set['choices'];
    if (!set || !problems || !choices) {
        errorGenerator_1.default({ statusCode: 400 });
    }
    //console.log('problems', problems[0]);
    //console.log('choices', choices);
    res.send();
};
exports.default = add;
//# sourceMappingURL=add.js.map