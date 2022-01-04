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
require("dotenv/config");
const tokenFunctions_1 = __importDefault(require("../controllers/tokenFunctions"));
const accessToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const auth = req.cookies;
    if (!auth) {
        return res.status(401).send('invalid user');
    }
    let token = auth.split(' ')[1];
    tokenFunctions_1.default.isAuthorized(token);
});
//# sourceMappingURL=checkauth.js.map