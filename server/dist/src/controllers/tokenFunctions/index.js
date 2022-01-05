"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtToken = {
    accessToken: (data) => {
        return jsonwebtoken_1.sign({ data: data }, process.env.SECRET_KEY, { expiresIn: '1h' });
    },
    isAuthorized: (data) => {
        try {
            return jsonwebtoken_1.verify({ data: data }, process.env.ACCESS_SECRET);
        }
        catch (err) {
            // return null if invalid token
            return null;
        }
    },
    sendAccessToken: (res, accessToken) => {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
    },
};
exports.default = jwtToken;
//# sourceMappingURL=index.js.map