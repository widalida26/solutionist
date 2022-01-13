"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require("dotenv/config");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.BUCKET_KEY_ID,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    region: process.env.BUCKET_REGION,
});
exports.upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: 'solutionist',
        acl: 'public-read',
        key: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${Date.now()}.${extension}`);
        },
    }),
});
//# sourceMappingURL=multer.js.map