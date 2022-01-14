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
const kakaoOauth = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { authorizationCode } = req.body;
    try {
        const resToken = yield axios_1.default({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_CLIENT_ID,
                client_secret: process.env.KAKAO_CLIENT_SECRET,
                code: authorizationCode,
                redirect_uri: process.env.CLIENT_URI,
            },
        });
        const { access_token: accessToken } = resToken.data;
        const kakaoUserInfo = yield axios_1.default({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const { nickname: username, profile_image: profileImage } = kakaoUserInfo.data.properties;
        const { email } = kakaoUserInfo.data.kakao_account;
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
        console.log(111, dbUser);
        if (!dbUser) {
            const user = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(users_1.users)
                .values([
                {
                    username: username,
                    email: email,
                    type: 'kakao',
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
    }
    catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});
exports.default = kakaoOauth;
//# sourceMappingURL=kakao.js.map