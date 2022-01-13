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
const signout = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id, email } = res.locals.userInfo;
        res.clearCookie('accessToken');
        const removeUser = yield typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(users_1.users)
            .where('id = :id OR email = :email', { id: id, email: email })
            .execute();
        // createConnection().then(async (connection) => {
        //   console.log(555);
        //   const removeUser = await connection.manager.findOne(users, {
        //     where: { id: id, email: email },
        //   });
        //   console.log(444);
        //   await connection.manager.remove(removeUser);
        // }).catch(error => console.log(error));
        return res.status(200).send('successfully signed out');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
});
exports.default = signout;
//# sourceMappingURL=signout.js.map