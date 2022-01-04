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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const typeorm_1 = require("typeorm");
const sets_1 = __importDefault(require("./routes/sets"));
const errorHandler_1 = __importDefault(require("./error/errorHandler"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const users_1 = __importDefault(require("./routes/users"));
const swaggerDocument = yamljs_1.default.load('./solutionist.yaml');
const port = 4000;
const app = express_1.default();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// db connection
app.use('/user', users_1.default);
typeorm_1.createConnection()
    .then((connection) => __awaiter(this, void 0, void 0, function* () { }))
    .catch((error) => console.log(error));
// basic routing
app.get('/', (req, res) => {
    res.send('hello');
});
// routing to controllers
app.use(sets_1.default);
// error handler
app.use(errorHandler_1.default);
// server listening
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map