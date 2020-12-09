"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDate = void 0;
exports.convertDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
