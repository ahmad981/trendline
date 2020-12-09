"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = void 0;
const crypto = require("crypto");
const config_1 = require("../config");
exports.generateHash = (email) => {
    return crypto.createHash('sha1').update(config_1.HashSecret + email).digest('hex');
};
