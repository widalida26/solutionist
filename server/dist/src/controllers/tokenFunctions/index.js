"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtToken = {
    accessToken: (data) => {
        return jsonwebtoken_1.sign({ data: data }, process.env.SECRET_KEY, { expiresIn: '1h' });
    },
    refreshToken: (data) => {
        return jsonwebtoken_1.sign({ data: data }, process.env.SECRET_KEY, { expiresIn: '1d' });
    },
    isAuthorized: (data) => {
        const authorization = data;
        if (!authorization) {
            return null;
        }
        const token = authorization.split(' ')[1];
        try {
            return jsonwebtoken_1.verify(token, process.env.ACCESS_SECRET);
        }
        catch (err) {
            // return null if invalid token
            return null;
        }
    },
    sendRefreshToken: (res, refreshToken) => {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
    },
    sendAccessToken: (res, accessToken) => {
        return res.status(200).json({ data: { accessToken }, message: 'ok' });
    },
};
exports.default = jwtToken;
//# sourceMappingURL=index.js.map