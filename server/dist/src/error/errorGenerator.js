"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP_STATUS_MESSAGES = {
    400: 'insufficient information',
    401: 'invalid user',
    409: 'duplicate information',
    500: 'internal Server Error',
};
const errorGenerator = ({ msg = '', statusCode = 500, }) => {
    const err = new Error(msg || HTTP_STATUS_MESSAGES[statusCode]);
    err.statusCode = statusCode;
    throw err;
};
exports.default = errorGenerator;
//# sourceMappingURL=errorGenerator.js.map