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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const image = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email } = res.locals.userInfo;
    console.log(111);
    try {
        const image = req.file.location;
        if (image === undefined) {
            return res.status(400).send('not exists image');
        }
        const info = typeorm_1.getRepository(users_1.users);
        const findUser = yield info.findOne({ where: { email: email } });
        const s3 = new aws_sdk_1.default.S3({
            accessKeyId: process.env.BUCKET_KEY_ID,
            secretAccessKey: process.env.BUCKET_SECRET_KEY,
            region: process.env.BUCKET_REGION,
        });
        if (findUser.profileImage !== null) {
            console.log(222, findUser);
            const s3ImageName = findUser.profileImage.substring(findUser.profileImage.lastIndexOf('/') + 1);
            s3.deleteObject({
                Bucket: 'solutionist',
                Key: `${s3ImageName}`,
            }, function (err, data) {
                if (err)
                    console.log(555, err, err.stack);
                else
                    console.log();
            });
        }
        console.log(333);
        yield typeorm_1.getConnection()
            .createQueryBuilder()
            .update(users_1.users)
            .set({ profileImage: image })
            .where('id = :id', { id: findUser.id })
            .execute();
        return res.status(200).send('successfully profile image changed');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
});
exports.default = image;
//# sourceMappingURL=profileImage.js.map