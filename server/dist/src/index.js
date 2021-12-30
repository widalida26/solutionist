'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const typeorm_1 = require('typeorm');
const app = (0, express_1.default)();
(0, typeorm_1.createConnection)()
  .then((connection) =>
    __awaiter(void 0, void 0, void 0, function* () {
      //entities: [users];
      //connection.manager.create(users);
      // const user = new users();
      // user.userName = 'kimcoding';
      // user.email = 'kimcoding@naver.com';
      // user.password = '1234';
      // user.profileImage = 'http://image.com';
      //await connection.manager.save(user);
    })
  )
  .catch((error) => console.log(error));
app.get('/', (req, res) => {
  res.send('hello');
});
app.listen('8000', () => {
  console.log('hello');
});
//# sourceMappingURL=index.js.map
