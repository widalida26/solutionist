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
const { encrypt } = require('./crypto');
const user_1 = require("../../../dist/src/entity/user");
const signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(422).send('insufficient parameters supplied');
        }
        // encrypt(password); 다 만들고 나서 적용 시작
        const createUser = yield user_1.users.create({
            username: userName,
            password: password,
            email: email,
        });
        return res.status(200).send('ok');
    }
    catch (err) {
        return res.status(400).send('internal server error');
    }
});
exports.default = signup;
//# sourceMappingURL=signup.js.map