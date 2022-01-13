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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const errorHandler_1 = __importDefault(require("./error/errorHandler"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const users_1 = __importDefault(require("./routes/users"));
const myPage_1 = __importDefault(require("./routes/myPage"));
const sets_1 = __importDefault(require("./routes/sets"));
require("dotenv/config");
typeorm_1.useContainer(typeorm_typedi_extensions_1.Container);
// db connection
typeorm_1.createConnection()
    .then((connection) => __awaiter(this, void 0, void 0, function* () { }))
    .catch((error) => console.log(error));
const port = 4000;
const app = express_1.default();
app.use(cookie_parser_1.default());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default({
    origin: true,
    allowedHeaders: ['Authorization, Content-Type'],
    //exposedHeaders: ['Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
}));
if (process.env.SERVER_SWAGGER) {
    const swaggerDocument = yamljs_1.default.load('./solutionist.yaml');
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
// basic routing
app.get('/', (req, res) => {
    res.send('hello');
});
app.use('/users', users_1.default);
app.use('/myPage', myPage_1.default);
// routing to controllers
app.use(sets_1.default);
// error handler
app.use(errorHandler_1.default);
// server listening
app.listen(port, () => {
    // console.log('rds username', process.env.RDS_USERNAME);
    // console.log('rds password', process.env.RDS_PASSWORD);
    // console.log('rds port', process.env.RDS_PORT);
    // console.log('rds database', process.env.RDS_DATABASE);
    // console.log('rds host', process.env.RDS_HOST);
    // console.log('access', process.env.ACCESS_SECRET);
    // console.log('secret', process.env.SECRET_KEY);
    // console.log('google id', process.env.GOOGLE_CLIENT_ID);
    // console.log('google secret', process.env.GOOGLE_CLIENT_SECRET);
    console.log(`server is listening on ${port} \nswagger hub ${process.env.SERVER_SWAGGER ? 'on' : 'off'}`);
});
//# sourceMappingURL=index.js.map