"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP_STATUS_MESSAGES = {
    400: 'insufficient information',
    401: 'invalid user',
    409: 'duplicate information',
    500: 'internal Server Error',
    422: 'insufficient parameters supplied',
};
const errorHandler = (err, req, res, next) => {
    console.log('에러발생');
    const { message, statusCode } = err;
    res.status(statusCode || 500).json({ message });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map