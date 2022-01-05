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
// import { users } from '../../database/entity/users';
// import { getConnection, getRepository } from 'typeorm';
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const googleLoginURL = 'https://accounts.google.com/o/oauth2/token';
const googleInfoURL = 'https://www.googleapis.com/oauth2/v3/userinfo';
module.exports = {
    googleSignin: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const googleClientId = process.env.GOOGLE_CLIENT_ID;
        const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
        try {
            const axiosRes = yield axios_1.default({
                method: 'post',
                url: 'googleInfoURL',
            });
        }
        catch (error) { }
    }),
};
//# sourceMappingURL=google.js.map