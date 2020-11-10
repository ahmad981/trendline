import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { ERR_ACCCESS_DENIED, ERR_FORBIDDEN } from '../enums';
import { jwtSecret } from '../config';
import * as jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(UNAUTHORIZED).json({
            message: ERR_ACCCESS_DENIED
        }).end();
    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (!decoded.ID) {
            return res.status(FORBIDDEN).json({
                message: ERR_FORBIDDEN,
            }).end();
        }
        console.log(decoded);
        req['user'] = decoded;

        next();
    } catch (ex) {

        return res.status(UNAUTHORIZED).json({
            message: ex.message,
        }).end();
    }
}

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req['user'].role === 'admin') {
        return next();
    } else {
        return res.status(FORBIDDEN).json({
            message: ERR_FORBIDDEN
        })
    }
}

export const checkSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req['user'].role === 'superAdmin') {
        return next();
    } else {
        return res.status(FORBIDDEN).json({
            message: ERR_FORBIDDEN
        })
    }
}