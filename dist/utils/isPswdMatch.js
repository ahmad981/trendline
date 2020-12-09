"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcrypt = require("bcryptjs");
exports.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};
