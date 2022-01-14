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
const crypto_1 = __importDefault(require("../../utils/crypto"));
const users_1 = require("../../database/entity/users");
const typeorm_1 = require("typeorm");
const index_1 = __importDefault(require("../../utils/tokenFunctions/index"));
const login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).send('ok');
        }
        const info = typeorm_1.getRepository(users_1.users);
        const user = yield info.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).send('Email not found');
        }
        const saltBase = user.salt;
        const salt = Buffer.from(saltBase, 'base64');
        const dbpw = crypto_1.default.encrypt(password, salt);
        const userpw = yield info.findOne({ where: { email: email, password: dbpw } });
        if (!userpw) {
            return res.status(401).send('password mismatch');
        }
        delete userpw.password;
        delete userpw.salt;
        const userInfo = JSON.stringify(userpw);
        const accessToken = index_1.default.accessToken(userInfo);
        const payload = {
            id: userpw.id,
            username: userpw.username,
            email: userpw.email,
            profileImage: userpw.profileImage,
            type: userpw.type,
        };
        index_1.default.sendAccessToken(res, accessToken);
        console.log(111, accessToken);
        return res.status(200).json({ data: { payload }, message: 'ok' });
    }
    catch (err) {
        console.log(res.status);
        return res.status(500).send('internal server error');
        // return res.status(500).send('internal server error');
    }
});
exports.default = login;
//# sourceMappingURL=login.js.map