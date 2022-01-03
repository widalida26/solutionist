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
const { encrypt, decrypt } = require('./crypto');
const signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { userId, email, password } = req.body;
        if (!userId || !email || !password) {
            return res.status(422).send('insufficient parameters supplied');
        }
    }
    finally {
    }
});
// const { Users } = require('../../models');
// const { encrypt, decrypt } = require('./crypto');
// module.exports = async (req, res) => {
//   const { userId, email, password } = req.body;
//   if (!req.body.email || !req.body.password || !req.body.userId) {
//     return res.status(422).send('insufficient parameters supplied');
//   }
//   const pw = encrypt(password);
//   const userDb = await Users.findOne({
//     where: {
//       userId,
//     },
//   });
//   if (userDb) {
//     return res.status(409).json({ message: 'already existed userId' });
//   }
//   const emailDb = await Users.findOne({
//     where: {
//       email,
//     },
//   });
//   if (emailDb) {
//     return res.status(409).send({ message: 'already existed email' });
//   }
//   Users.create({
//     userId: userId,
//     password: pw,
//     email: email,
//   });
//   return res.status(200).send('ok');
// };
//# sourceMappingURL=signup.js.map