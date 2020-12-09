"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
exports.generateToken = (id, role) => {
    return jwt.sign({ ID: id, role }, config_1.jwtSecret);
};
// export default generateToken;
