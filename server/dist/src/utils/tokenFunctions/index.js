"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtToken = {
    accessToken: (data) => {
        const period = process.env.EXPIRATION_PERIOD
            ? process.env.EXPIRATION_PERIOD
            : '1h';
        return jsonwebtoken_1.sign({ data: data }, process.env.ACCESS_SECRET, { expiresIn: period });
    },
    isAuthorized: (data) => {
        if (!data) {
            return null;
        }
        try {
            const token = data;
            return jsonwebtoken_1.verify(token, process.env.ACCESS_SECRET);
        }
        catch (err) {
            console.log(err);
            // return null if invalid token
            return null;
        }
    },
    sendAccessToken: (res, accessToken) => {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            // sameSite: 'none',
            // secure: true,
            maxAge: 1000 * 60 * 60,
        });
    },
};
exports.default = jwtToken;
//# sourceMappingURL=index.js.map