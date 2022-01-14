"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../controllers/users/signup"));
const login_1 = __importDefault(require("../controllers/users/login"));
const checkauth_1 = require("../middleware/checkauth");
const signout_1 = __importDefault(require("../controllers/users/signout"));
const logout_1 = __importDefault(require("../controllers/users/logout"));
const email_1 = __importDefault(require("../controllers/users/email"));
const kakao_1 = __importDefault(require("../controllers/users/kakao"));
const google_1 = __importDefault(require("../controllers/users/google"));
const userRouter = express_1.default.Router();
userRouter.delete('/signout', checkauth_1.blockUnauthorized, signout_1.default);
userRouter.get('/email/:email', email_1.default);
userRouter.post('/signup', signup_1.default);
userRouter.post('/login', login_1.default);
userRouter.post('/google', google_1.default);
userRouter.post('/logout', checkauth_1.blockUnauthorized, logout_1.default);
userRouter.post('/kakao', kakao_1.default);
exports.default = userRouter;
//# sourceMappingURL=users.js.map