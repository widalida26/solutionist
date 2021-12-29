"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const app = express_1.default();
typeorm_1.createConnection({
    type: 'mysql',
    database: 'solutionist',
    username: 'admin',
    password: '20211229',
    host: 'codestates-project.c4i369t7q8dg.ap-northeast-2.rds.amazonaws.com',
    entities: [user_1.users],
}).catch((err) => {
    console.log(err);
});
app.get('/', (req, res) => {
    res.send('hello');
});
app.listen('8000', () => {
    console.log('hello');
});
//# sourceMappingURL=index.js.map