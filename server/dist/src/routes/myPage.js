"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileImage_1 = __importDefault(require("../controllers/myPage/profileImage"));
const username_1 = __importDefault(require("../controllers/myPage/username"));
const checkauth_1 = require("../middleware/checkauth");
const multer_1 = require("../middleware/multer");
const password_1 = __importDefault(require("../controllers/myPage/password"));
const myPage = express_1.default.Router();
myPage.patch('/profileImage', checkauth_1.blockUnauthorized, multer_1.upload.single('image'), profileImage_1.default);
myPage.patch('/username', checkauth_1.blockUnauthorized, username_1.default);
myPage.patch('/password', checkauth_1.blockUnauthorized, password_1.default);
exports.default = myPage;
//# sourceMappingURL=myPage.js.map