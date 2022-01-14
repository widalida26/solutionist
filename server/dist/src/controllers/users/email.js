"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const users_1 = require("../../database/entity/users");
const typeorm_1 = require("typeorm");
require("dotenv/config");
const email = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const info = typeorm_1.getRepository(users_1.users);
        const userFind = yield info.findOne({ where: { email: email } });
        if (userFind) {
            return res.status(409).send('duplicate information');
        }
        return res.status(200).send('email duplicate check passed ');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
});
module.exports = email;
//# sourceMappingURL=email.js.map