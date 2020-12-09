"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = exports.convertError = exports.notFoundHandler = exports.handler = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const httpStatus = require("http-status");
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack,
    };
    // temporary commented, later uncomment and use it.
    // if (env !== 'development') {
    //   delete response.stack;
    // }
    const status = err.message.toLowerCase() === 'validation error' ? 400 : 500;
    res.status(err.status || status);
    res.json({ message: err.message });
    res.end();
};
exports.handler = handler;
const notFoundHandler = (req, res) => {
    return handler(new HttpException(404, 'api not found'), req, res);
};
exports.notFoundHandler = notFoundHandler;
const convertError = (err, req, res, next) => {
    console.log('---------- erro r --------');
    console.log(err);
    console.log('---------- erro r --------');
    if (!(err instanceof HttpException)) {
        if (err.name) {
            return next(new HttpException(422, err.errors[0].message));
        }
    }
    return handler(err, req, res);
};
exports.convertError = convertError;
