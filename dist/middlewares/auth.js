"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = exports.loginLimiter = exports.checkCompany = exports.checkSuperAdmin = exports.checkApplicant = exports.checkAdmin = exports.verifyToken = void 0;
const http_status_1 = require("http-status");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const enums_1 = require("../enums");
const config_1 = require("../config");
exports.verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(http_status_1.UNAUTHORIZED).json({
            message: enums_1.ERR_ACCCESS_DENIED,
        }).end();
    try {
        const decoded = jwt.verify(token, config_1.jwtSecret);
        if (!decoded.ID) {
            return res.status(http_status_1.FORBIDDEN).json({
                message: enums_1.ERR_FORBIDDEN,
            }).end();
        }
        req.user = decoded;
        return next();
    }
    catch (ex) {
        return res.status(http_status_1.UNAUTHORIZED).json({
            message: ex.message,
        }).end();
    }
};
exports.checkAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'superadmin') {
        return next();
    }
    return res.status(http_status_1.FORBIDDEN).json({
        message: enums_1.ERR_FORBIDDEN,
    });
};
exports.checkApplicant = (req, res, next) => {
    const { role } = req.user;
    if (role.toLowerCase() === 'applicant') {
        return next();
    }
    return res.status(http_status_1.FORBIDDEN).json({
        message: enums_1.ERR_FORBIDDEN,
    });
};
exports.checkSuperAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role.toLowerCase() === 'superadmin') {
        return next();
    }
    return res.status(http_status_1.FORBIDDEN).json({
        message: enums_1.ERR_FORBIDDEN,
    });
};
exports.checkCompany = (req, res, next) => {
    const { role } = req.user;
    if (role.toLowerCase() === 'employer') {
        return next();
    }
    return res.status(http_status_1.FORBIDDEN).json({
        message: enums_1.ERR_FORBIDDEN,
    });
};
exports.loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many many attempts to login, please try again after an hour',
});
exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
