"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const { message, statusCode } = err;
    console.error(err);
    res.status(statusCode || 500).json({ message });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map