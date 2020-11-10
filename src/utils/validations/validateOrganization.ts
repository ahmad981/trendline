
import Joi = require('joi');
import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../../apis/models';
import { VARIANT_ALSO_NEGOTIATES } from 'http-status';
import { VALIDATION_ERROR_STATUS } from '../../enums';

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    organizationId: Joi.number().required(),
    roleId: Joi.number().required(),
    name: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


export const validateUserSignup = (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface = req.body;
    const { value, error } = schema.validate(user);
    if (!error) {
        return next();
    } else {
        res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    }
}



export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface = req.body;
    const { value, error } = loginSchema.validate(user);
    if (!error) {
        return next();
    } else {
        res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    }
}


