import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as rateLimit from 'express-rate-limit';
import { ERR_ACCCESS_DENIED, ERR_FORBIDDEN } from '../enums';
import { jwtSecret } from '../config';
import { CustomRequest } from '../apis/models';


export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(UNAUTHORIZED).json({
      message: ERR_ACCCESS_DENIED,
    }).end();
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded.ID) {
      return res.status(FORBIDDEN).json({
        message: ERR_FORBIDDEN,
      }).end();
    }
    req.user = decoded;

    return next();
  } catch (ex) {

    return res.status(UNAUTHORIZED).json({
      message: ex.message,
    }).end();
  }
};

export const checkAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const {role} = req.user;

  if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'superadmin') {
    return next();
  } 
  return res.status(FORBIDDEN).json({
    message: ERR_FORBIDDEN,
  });
    
};

export const checkApplicant = (req: CustomRequest, res: Response, next: NextFunction) => {
  const {role} = req.user;

  if (role.toLowerCase() === 'applicant') {
    return next();
  } 
  return res.status(FORBIDDEN).json({
    message: ERR_FORBIDDEN,
  });
    
};

export const checkSuperAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const {role} = req.user;

  if (role.toLowerCase() === 'superadmin') {
    return next();
  } 
  return res.status(FORBIDDEN).json({
    message: ERR_FORBIDDEN,
  });
    
};

export const checkCompany = (req: CustomRequest, res: Response, next: NextFunction) => {

  const {role} = req.user;

  if (role.toLowerCase() === 'employer') {
    return next();
  } 
  return res.status(FORBIDDEN).json({
    message: ERR_FORBIDDEN,
  });
    
};


export const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
        'Too many many attempts to login, please try again after an hour',
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 250,
});