/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

const errorfile = 'error.log';


class HttpException extends Error {
  status: number;

  message: string;

  errors: any;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}


/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
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

  const status = err.message && err.message.toLowerCase() === 'validation error' ? 400 : 500;

  res.status(err.status || status);
  res.json({ message: err.message });
  res.end();
};

const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  return handler(new HttpException(404, 'api not found'), req, res, next);
};

const convertError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const message = `:: -- ${new Date} | [${req.method}] | ${req.url} | [ERROR] | ${err.message} \r\n ${err.stack} \r\n `;
  fs.writeFileSync(errorfile, message, {flag: 'a'});
  if (!(err instanceof HttpException)) {
    if (err.name) {
      return next(new HttpException(422, err.errors[0].message));
    }
  }

  return next(err);
};

export { handler, notFoundHandler, convertError, HttpException };

