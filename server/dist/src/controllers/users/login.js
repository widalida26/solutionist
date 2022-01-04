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
const crypto_1 = __importDefault(require("../../crypto"));
const users_1 = require("../database/entity/users");
const typeorm_1 = require("typeorm");
const index_1 = __importDefault(require("../tokenFunctions/index"));
const login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(422).send('ok');
        }
        const dbpw = crypto_1.default.encrypt(password);
        const user = yield typeorm_1.getRepository(users_1.users)
            .createQueryBuilder('user')
            .where('user.username = :username OR user.password = :password', {
            username: username,
            password: dbpw,
        })
            .getOneOrFail();
        console.log(user);
        if (!user) {
            return res.status(401).send('"invalid user"');
        }
        console.log(222);
        delete user.password;
        const userInfo = JSON.stringify(user);
        const accessToken = index_1.default.accessToken(userInfo);
        const refreshToken = index_1.default.refreshToken(userInfo);
        console.log(333);
        index_1.default.sendRefreshToken(res, refreshToken);
        index_1.default.sendAccessToken(res, accessToken);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
        // return res.status(500).send('internal server error');
    }
});
exports.default = login;
//# sourceMappingURL=login.js.map