import * as httpStatus from 'http-status';

/**
 * @extends Error
 */
export class ExtendableError extends Error {
  public name: string;
  public message: string;
  public status: number;
  public isOperational: boolean;
  public stack: any;
  public isPublic: boolean;
  public errors: any;

  constructor({ message: string, errors: any, status: boolean, isPublic: boolean, stack:any }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message: string,
    errors: any,
    stack: any,
    status: number = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic: boolean = false,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}

// module.exports = APIError;
