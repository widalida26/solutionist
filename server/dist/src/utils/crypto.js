"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
require("dotenv/config");
const algorithm = 'aes-256-ctr';
const secretKey = process.env['SECRET_KEY'];
const cryptos = {
    encrypt: (text, iv) => {
        console.log('secretKey', secretKey);
        const cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return encrypted.toString('hex');
    },
    decrypt: (hash, iv) => {
        console.log('secretKey', secretKey);
        const decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, iv);
        const decrpyted = Buffer.concat([
            decipher.update(Buffer.from(hash, 'hex')),
            decipher.final(),
        ]);
        return decrpyted.toString();
    },
};
exports.default = cryptos;
//# sourceMappingURL=crypto.js.map