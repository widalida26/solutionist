"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmptyObject = (obj) => {
    if (Object.keys(obj).length === 0) {
        return true;
    }
    else {
        return false;
    }
};
exports.checkEmptyObjectValue = (obj) => {
    return Object.values(obj).some((val) => val === null || val === '');
};
exports.insertIntoObject = (obj, key, val) => {
    obj[key] = val;
    return obj;
};
exports.convertRawObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
exports.timestampToLocaleTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};
//# sourceMappingURL=custom.js.map