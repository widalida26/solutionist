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
const users_1 = require("../../database/entity/users");
const typeorm_1 = require("typeorm");
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../../utils/tokenFunctions/index"));
const google = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { authorizationCode } = req.body;
    const decode = decodeURIComponent(authorizationCode);
    try {
        const resToken = yield axios_1.default({
            method: 'POST',
            url: 'https://oauth2.googleapis.com/token',
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                code: decode,
                redirect_uri: process.env.CLIENT_URI,
            },
        });
        const { access_token: accessToken } = resToken.data;
        const userInfo = yield axios_1.default({
            method: 'GET',
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const { name: username, email, picture: profileImage } = userInfo.data;
        const findUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const info = typeorm_1.getRepository(users_1.users);
                const user = yield info.findOne({ where: { email: email } });
                return user;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
        const dbUser = yield findUser();
        if (!dbUser) {
            const user = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(users_1.users)
                .values([
                {
                    username: username,
                    email: email,
                    type: 'google',
                    profileImage: profileImage,
                },
            ])
                .execute();
        }
        const secondFind = yield findUser();
        const payload = {
            username: secondFind.username,
            email: secondFind.email,
            type: secondFind.type,
            profileImage: secondFind.profileImage,
        };
        const userString = JSON.stringify(payload);
        const accessToken2 = index_1.default.accessToken(userString);
        index_1.default.sendAccessToken(res, accessToken2);
        console.log('accessToken', accessToken2);
        return res.status(201).json({ data: payload });
        console.log(resToken);
    }
    catch (err) {
        console.log('err :', err);
        return res.status(500).send('Internal Server Error');
    }
});
exports.default = google;
// import { Request, Response } from 'express';
// import { users } from '../../database/entity/users';
// import { getRepository, getConnection } from 'typeorm';
// import 'dotenv/config';
// import axios from 'axios';
// import jwtToken from '../../utils/tokenFunctions/index';
// const googleOauth = async (req: Request, res: Response) => {
//   const googletokenURL = 'https://oauth2.googleapis.com/token';
//   const googleInfoURL = 'https://www.googleapis.com/oauth2/v2/userinfo';
//   const googleClientId = process.env.GOOGLE_CLIENT_ID;
//   const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
//   try {
//     const tokenRes = await axios.post(
//       `https://oauth2.googleapis.com/token?code=${req.body.authorizationCode}&client_id=${googleClientId}&client_secret=${googleClientSecret}&redirect_uri=${process.env.CLIENT_URI}&grant_type=authorization_code`
//     );
//     const { access_token: accessToken } = tokenRes.data;
//     const userInfo = await axios.get(googleInfoURL, {
//       headers: {
//         authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const { name: username, email, picture: profileImage } = userInfo.data;
//     const info = getRepository(users);
//     const findUser = await info.findOne({ where: { email: email } });
//     if (!findUser) {
//       const user = await getConnection()
//         .createQueryBuilder()
//         .insert()
//         .into(users)
//         .values([{ username: username, email: email, type: 'google', profileImage }])
//         .execute();
//       const secondFind = await info.findOne({ where: { email: email } });
//       const payload = {
//         id: secondFind.id,
//         username: secondFind.username,
//         email: secondFind.email,
//         type: secondFind.type,
//         role: secondFind.role,
//       };
//       const userString = JSON.stringify(payload);
//       const accessToken = jwtToken.accessToken(userString);
//       jwtToken.sendAccessToken(res, accessToken);
//       console.log('accessToken', accessToken);
//       return res.status(201).json({ data: payload });
//     } else {
//       const payload = {
//         id: findUser.id,
//         username: findUser.username,
//         email: findUser.email,
//         type: findUser.type,
//         role: findUser.role,
//       };
//       const userString = JSON.stringify(payload);
//       const accessToken = jwtToken.accessToken(userString);
//       jwtToken.sendAccessToken(res, accessToken);
//       console.log('accessToken', accessToken);
//       return res.status(201).json({ data: payload });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send('Internal Server Error');
//   }
// };
// export default googleOauth;
//# sourceMappingURL=google.js.map