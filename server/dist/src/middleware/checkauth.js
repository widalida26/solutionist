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
const typeorm_1 = require("typeorm");
const users_1 = require("../database/entity/users");
const Token = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const auth = req.cookies.accessToken;
    if (!auth) {
        return res.status(403).send('invalid user');
    }
    const authorized = tokenFunctions_1.default.isAuthorized(auth);
    if (!authorized) {
        return res.status(400).send('not authorization');
    }
    const { email } = authorized.email;
    const info = typeorm_1.getRepository(users_1.users);
    const findUser = yield info.findOne({ where: { email: email } });
    if (!findUser) {
        return res.status(401).send('userInfo does not exist');
    }
    res.locals.userInfo = findUser;
    res.locals.authtoken = auth;
    next();
});
//# sourceMappingURL=checkauth.js.map