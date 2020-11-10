/* eslint-disable @typescript-eslint/no-explicit-any */
import * as httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import * as expressValidation from 'express-validation';
import { Sequelize } from 'sequelize';
/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
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

  console.log('error', err);
  const status = err.message.toLowerCase() === 'validation error' ? 400 : 500;

  res.status(err.status || status);
  res.json(err.message);
  res.end();
};

const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  return handler(new HttpException(404, 'api not found'), req, res, next);
};

const convertError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!(err instanceof HttpException)) {
    console.log("inspecting", err);
    if (err.name) {
      return next(new HttpException(422, err.errors[0].message));
    }
  }

  return handler(err, req, res, next);
};

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

export { handler, notFoundHandler, convertError, HttpException };

