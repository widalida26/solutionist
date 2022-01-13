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
const users_1 = require("../../database/entity/users");
const typeorm_1 = require("typeorm");
require("dotenv/config");
const modifyUsername = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id, username } = res.locals.userInfo;
        const { newUserName } = req.body;
        if (newUserName === username) {
            return res.status(409).send('duplicate information');
        }
        yield typeorm_1.getConnection()
            .createQueryBuilder()
            .update(users_1.users)
            .set({ username: newUserName })
            .where('id = :id', { id: id })
            .execute();
        return res
            .status(201)
            .json({ data: newUserName, message: 'successfully user name changed' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
});
exports.default = modifyUsername;
//# sourceMappingURL=username.js.map