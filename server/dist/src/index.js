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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const sets_1 = __importDefault(require("./routes/sets"));
const errorHandler_1 = __importDefault(require("./error/errorHandler"));
const port = 4000;
const app = express_1.default();
app.use(cors_1.default());
app.use(cookieparser());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
s;
typeorm_1.createConnection()
    .then((connection) => __awaiter(this, void 0, void 0, function* () { }))
    .catch((error) => console.log(error));
app.get('/', (req, res) => {
    res.send('hello');
});
app.use(sets_1.default);
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map