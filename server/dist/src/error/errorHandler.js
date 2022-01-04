"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log('에러발생');
    const { message, statusCode } = err;
    res.status(statusCode || 500).json({ message });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map